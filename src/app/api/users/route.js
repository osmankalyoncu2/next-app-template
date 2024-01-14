// Route for API requests for user functionality

import { NextResponse } from "next/server";

import {
    app_database,
    next_auth_database,
} from "@/lib/database/connect";

import withTrace from "@/lib/logging/usetrace";
import { auth } from "@/auth/auth";
import NextError from "@/lib/utils/NextError";

async function requestUserDeletion(
    req
) {
    // Method to delete a user permanently - this should only be used in cases where a user has requested (for their data, not them!) to be deleted

    const user = await auth();

    if (!user) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You must be logged in to delete your account.",
            },
            {
                status: 401,
            }
        )
    }

    // We give them 7 days to change their mind
    const DELETE_AFTER = 7 * 24 * 60 * 60; // 7 days in seconds (604800)

    const DELETE_AFTER_DATE = new Date(new Date().getTime() + DELETE_AFTER * 1000).toISOString();

    // Step 0. Confirm that the user has not already requested their account to be deleted
    const { data: scheduled_tasks, error: error_getting_scheduled_tasks } = await app_database
        .from('scheduled')
        .select('action, variables')
        .eq('action', 'delete_user')
        .overlaps('variables', [
            user.user.id
        ]);

    if (error_getting_scheduled_tasks) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "Error getting scheduled tasks.",
            },
            {
                status: 500,
            }
        );
    }

    if (scheduled_tasks.length > 0) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You have already requested your account to be deleted.",
            },
            {
                status: 400,
            }
        );
    }
    
    // Step 1. Add a row to the database table `scheduled` with the action `delete_user` and the variables `user.id` and set `run_after` to `DELETE_AFTER_DATE`
    const {
        error: error_adding_scheduled_task
    } = await app_database
        .from('scheduled')
        .insert({
            "action": "delete_user",
            "variables": [user.user.id],
            "run_after": DELETE_AFTER_DATE,
        });

    if (error_adding_scheduled_task) {
        // NextError extends Error constructor.
        throw new NextError(error_adding_scheduled_task);
    }

    // Step 2. Send an email to the user letting them know their account has been scheduled for deletion

    // TODO: The below stuff - I need to design the email first
    /*SendEmail({
        "to": "user.email",
        "subject": "Your account has been scheduled for deletion",
        "text": "Your account has been scheduled for deletion.",
        "html": "Your account has been scheduled for deletion.",
    })*/

    // Step 3. Return a success message
    return NextResponse.json(
        {
            "status": "success",
            "message": "Your account has been scheduled for deletion.",
        },
        {
            status: 200,
        }
    );
}

const updatable_details = {};

async function updateUserDetails(req) {
    // Method for a user to update their details

    const user = await auth();

    if (!user) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You must be logged in to update your account.",
            },
            {
                status: 401,
            }
        )
    }

    // Step 0. Check that the user has provided the correct details
    const { data } = await req.json();

    const errors = [];

    for (const [key, value] of Object.entries(data)) {
        if (!updatable_details[key]) {
            errors.push({
                "key": key,
                "message": "This key is not updatable.",
            });
        } else {
            if (typeof value !== updatable_details[key].type) {
                errors.push({
                    "key": key,
                    "message": "This key is not of the correct type.",
                });
            } else {
                if (value.length < updatable_details[key].minLength) {
                    errors.push({
                        "key": key,
                        "message": "This key is too short.",
                    });
                } else if (value.length > updatable_details[key].maxLength) {
                    errors.push({
                        "key": key,
                        "message": "This key is too long.",
                    });
                }
            }
        }

        if (errors.length > 0) {
            return NextResponse.json(
                {
                    "status": "error",
                    "message": "There were errors with your request.",
                    "errors": errors,
                },
                {
                    status: 400,
                }
            );
        }

        // Step 1. Update the user's details
        const { error } = await updatable_details[key].function(value, user.user.id);

        if (error) {
            return NextResponse.json(
                {
                    "status": "error",
                    "message": "There was an error updating your details.",
                },
                {
                    status: 500,
                }
            );
        }

        // Step 2. Return a success message
        return NextResponse.json(
            {
                "status": "success",
                "message": "Your details have been updated.",
            },
            {
                status: 200,
            }
        );
    }

    return NextResponse.json(
        {
            message: "This should never happen.",
        },
        {
            status: 200,
        }
    );
}

export const DELETE = withTrace(requestUserDeletion, "user-deletion-request", "high"); // A user requesting their account to be deleted is a high sensitivity action
export const PATCH = withTrace(updateUserDetails, "user-details-update", "low"); // Updating a user's details is a low sensitivity action
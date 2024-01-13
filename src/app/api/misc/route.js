import { NextResponse } from "next/server";

import {
    app_database,
} from "@/lib/database/connect";
import withTrace from "@/lib/logging/usetrace";

import deleteUser from "@/lib/functions/deleteUser";

const misc_jobs = {
    "delete_user": deleteUser, // Idea: 7 days after a user requests deletion, we should delete their account unless they log back in (which would cancel the deletion)
}

async function runMiscJobs() {
    // when a request is made to /api/misc, we need to query the database table `scheduled` to see if there are any scheduled tasks that need to be run
    // we know a request must be made when the `run_after` timestamp is less than the current time, we should search for this in the database
    // after a task is run, we should delete it from the database


    // Step 1. Query the database for any scheduled tasks that need to be run

    const { data: scheduled_tasks, error: error_getting_scheduled_tasks } = await app_database
        .from('scheduled')
        .select('action, variables')
        .lt('run_after', new Date().toISOString());

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

    // Step 2. Run the scheduled tasks
    // action is a string that we need to lookup in a switch statement
    // variables is an array of strings which we need to pass to the function IN ORDER

    for (const task of scheduled_tasks) {
        if (task.action in misc_jobs) {
            await misc_jobs[task.action](...task.variables);
        }
    }

    return NextResponse.json(
        {
            "status": "success",
            "message": "Misc Jobs Complete.",
        },
        {
            status: 200,
        }
    );
}

export const GET = withTrace(runMiscJobs, "GET /api/misc", "low"); // Running Misc Jobs shouldn't be a security risk, so we can set the sensitivity to low
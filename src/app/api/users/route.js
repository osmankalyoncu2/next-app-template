// Route for API requests for user functionality

import { NextResponse } from "next/server";

import {
    app_database,
    next_auth_database,
} from "@/lib/database/connect";

export async function DELETE() {
    // Method for a user to request their account and all of its data be deleted
    // It’s a destructive action, so we should give them 7 days to change their mind
    // If they don’t change their mind, we delete their account and all of their data

    return NextResponse.json(
        {
            message: "Account deletion requested.",
        },
        {
            status: 200,
        }
    );
}

export async function PATCH() {
    // Method for a user to update their details

    return NextResponse.json(
        {
            message: "Details updated.",
        },
        {
            status: 200,
        }
    );
}
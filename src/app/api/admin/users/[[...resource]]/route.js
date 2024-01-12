// User Management is only available to Admins

import { NextResponse } from "next/server";

import {
    app_database,
    next_auth_database,
} from "@/lib/database/connect";

import withTrace from "@/lib/logging/usetrace";

async function requestUserDeletion(
    req
) {
    // Method to delete a user permanently - this should only be used in cases where a user has requested (for their data, not them!) to be deleted
    return NextResponse.json(
        {
            "status": "error",
            "message": "This feature is not yet available",
        },
        {
            status: 500,
        }
    );
}

export async function GET() {
    // Get specific details for a user from the database
}

export async function POST() {
    // Make a request. For example, to begin impersonating a user
}

export const DELETE = withTrace(requestUserDeletion, "user-deletion-request", "high"); // A user requesting their account to be deleted is a high sensitivity action
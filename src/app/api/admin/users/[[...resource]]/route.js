// User Management is only available to Admins

import { NextResponse } from "next/server";

import {
    app_database,
    next_auth_database,
} from "@/lib/database/connect";

export async function GET() {
    // Get specific details for a user from the database
}

export async function POST() {
    // Make a request. For example, to begin impersonating a user
}
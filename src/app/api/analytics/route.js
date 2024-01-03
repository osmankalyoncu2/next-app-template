import { NextResponse } from "next/server";

export async function POST(req) {
    // when a request is made to /api/analytics, we need to record the current stats of our app
    // then we save the data to our database so we can later display it on the admin dashboard
    // and use the data to make decisions on how to improve our app, onboard investors, etc.

    // Learn more about this in the Next App Template Docs (/src/docs/analytics/Analytics.md)
}
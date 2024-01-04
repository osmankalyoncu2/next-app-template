import { NextResponse } from "next/server";

export async function POST(req) {
    // when a request is made to /api/analytics, we need to record the current stats of our app
    // then we save the data to our database so we can later display it on the admin dashboard
    // and use the data to make decisions on how to improve our app, onboard investors, etc.

    // Learn more about this in the Next App Template Docs (/src/docs/analytics/Analytics.md)

    // one of the things we want to track is user count
    // we track user count by counting the number of users in our database
    // a request to this endpoint is made every 3, 15, 30, or 60 (or a custom value) minutes via a GitHub Action
    

}

function getUserCount() {
    return 0;
}
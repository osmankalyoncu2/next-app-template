import { NextResponse } from "next/server";

import {
    app_database,
    next_auth_database,
} from "@/lib/database/connect";

export async function GET() {
    // when a request is made to /api/analytics, we need to record the current stats of our app
    // then we save the data to our database so we can later display it on the admin dashboard
    // and use the data to make decisions on how to improve our app, onboard investors, etc.

    // Learn more about this in the Make Next App Docs (/docs/analytics/Analytics.md)

    // one of the things we want to track is user count
    // we track user count by counting the number of users in our database
    // a request to this endpoint is made every 5, 15, 30, or 60 (or a custom value) minutes via a GitHub Action
    // the GitHub Action is defined in .github/workflows/analytics.yml

    // Step 1. Define the Analytics we want to track and how we track them

    // IMPORTANT: The keys in the analytics object are equivalent to the `analytic_id` we store in our database

    // We should only store the analytics when they change rather than storing the same value over and over again when it doesn't change (prevents data redundancy)
    // We can also infer analytics. For example, we only stored the user count at 10:00 and 18:00 despite it running every hour, this means that at the times
    // 10:01 - 17:00

    const analytics = {
        "user_count": await getUserCount(),
    }

    // Step 2. Save the Analytics to our Database
    // for loop to iterate over the analytics object

    for (const [analytic_id, analytic_value] of Object.entries(analytics)) {
        if (analytic_value === null) {
            continue;
        }

        const { data: save_data, error: error_saving } = await app_database
            .from('analytics')
            .insert(
                {
                    analytic_id: analytic_id,
                    value: analytic_value,
                }
            );

        if (error_saving) {
            console.error('Error saving data:', error_saving);
        }
    }

    return NextResponse.json(
        {
            "status": "success",
            "message": "Analytics saved successfully",
        },
        {
            status: 200,
        }
    );
}

async function getUserCount() {
    // Select the latest result from the analytics table where the analytic_id is user_count
    const { data: analytic_count, error: analytic_error } = await app_database
        .from('analytics')
        .select('value')
        .eq('analytic_id', 'user_count')
        .order('created_at', { ascending: false })
        .limit(1);

    if (analytic_error) {
        console.error(analytic_error);
        return null;
    }

    // If zero rows are returned, set `old_count` to zero
    // Otherwise, set `old_count` to the value of the `value` column
    const old_count = analytic_count && analytic_count.length > 0 ? analytic_count[0].value : 0;

    // Note: head is set to true so that we only get the count and not the data
    // Count is stored in the `count` property
    const { count: new_count, error: error } = await next_auth_database
        .from('users')
        .select('*', { count: 'exact', head: true })

    if (error) {
        console.error(error);
        return null;
    }

    // If the old count is equal to the current count, return null
    if (old_count === new_count) {
        return null;
    }

    return new_count;
}
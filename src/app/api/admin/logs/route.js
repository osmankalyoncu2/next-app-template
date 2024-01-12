// Viewing API Logs should only be accessible to Admins

import { NextResponse } from "next/server";

import {
    app_database
} from "@/lib/database/connect";

import withTrace from "@/lib/logging/usetrace";
import { auth } from "@/auth/auth";

async function getLogs(
    req
) {
    const { user } = await auth();

    if (!user || user?.role !== "admin") {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You are not authorized to access this resource.",
                role: user?.role,
                loggedIn: !!user,
            },
            {
                status: 401,
            }
        )
    }


    // from the query, get the page number and the number of items per page
    // if not provided, set defaults
    const page = req?.query?.page ? req.query.page : 0;
    const perPage = req?.query?.perPage ? req.query.perPage : 20;

    // get the logs from the database
    const { data: logs, logs_error } = await app_database
        .from('logs')
        .select("*")
        .order("created_at",
            {
                ascending: false,
            }
        )
        .range(page * perPage, (page + 1) * perPage - 1);

    if (logs_error) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "There was an error retrieving the logs",
            },
            {
                status: 500,
            }
        )
    }

    // get the total number of logs
    const { count: totalLogs, error: total_logs_error } = await app_database
        .from('logs')
        .select('*', { count: 'exact', head: true })

    if (total_logs_error) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "There was an error retrieving the logs",
            },
            {
                status: 500,
            }
        )
    }

    // return the logs
    return NextResponse.json(
        {
            "status": "success",
            "logs": logs,
            "totalLogs": totalLogs,
            "page": page,
            "perPage": perPage,
        },
        {
            status: 200,
        }
    );
}

export const GET = withTrace(getLogs, "get-api-logs", "medium");

// API logs should either have a sensitivity of high or medium depending on whether request/response data is logged
// If request/response data is logged, then the sensitivity should be high otherwise medium
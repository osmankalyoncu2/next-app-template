// Route for API Key functionality

import { NextResponse } from "next/server";

import { auth } from "@/auth/auth";
import withTrace from "@/lib/logging/usetrace";
import { generateApiKey, whoIsApiKey } from "@/lib/utils/apiKey";

async function revokeApiKey(
    req
) {
    const user = await auth();

    if (!user) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You must be logged in to revoke an API key.",
            },
            {
                status: 401,
            }
        )
    }

    // This is a DELETE method, so we need to get the API key from the URL
    const { key } = req.query;

    if (!key) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You must provide an API key to revoke.",
            },
            {
                status: 400,
            }
        )
    }

    // TODO: Complete this
}

async function generateKey(
    req
) {
    const user = await auth();

    if (!user) {
        return NextResponse.json(
            {
                "status": "error",
                "message": "You must be logged in to generate an API key.",
            },
            {
                status: 401,
            }
        )
    }

    const { key: apiKey } = await generateApiKey(user.user.id);

    return NextResponse.json(
        {
            "status": "success",
            "message": "API key generated.",
            "key": apiKey,
        },
        {
            status: 200,
        }
    )
}

export const POST = withTrace(generateKey, "generate-api-key", "medium");
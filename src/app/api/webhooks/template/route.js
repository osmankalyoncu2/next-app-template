// This file is a template webhook route file to showcase how to build webhook routes.

import { NextResponse } from "next/server"

export function POST(req) {
    let event;

    try {
        event = JSON.parse(req.body);
    } catch (error) {
        return NextResponse.error(error);
    }

    return NextResponse.json(
        {
            message: "Webhook received",
            event: event
        },
        {
            status: 200
        }
    );
}

// Webhook routes are usually POST requests - if you need another method, find the documentation here -> https://nextjs.org/docs/app/building-your-application/routing/route-handlers
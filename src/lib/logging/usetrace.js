"use server";

// Supabase Adapter
import {
    app_database
} from '@/lib/database/connect'

// Crypto
import { randomUUID } from 'crypto';

// Next Server Stuff
import { NextResponse } from "next/server";
import { headers as NextHeaders } from 'next/headers';

// Betterstack
import { logtail } from "@/lib/logging/betterstack";
import NextError from '../utils/NextError';

// If false, we won't store the API request or response in the database.
// We will still store the action, status and the impersonator if applicable.
const logRequestDetails = process.env.LOG_REQUEST_DETAILS
    ? process.env.LOG_REQUEST_DETAILS === "true"
    : false;

// This requires Betterstack to be enabled.
const storeInDatabase = process.env.STORE_TRACE_IN_DATABASE
    ? process.env.STORE_TRACE_IN_DATABASE === "true"
    : true;

// The goal of `api-trace` is to log API requests made to the app. This is useful for debugging and for security purposes.

// This specific file is used to generate a trace_id for each API request.
// The trace_id is used to track the request through the app and is logged to the database.

// The tracer is a wrapper around a route handler.

/**
 * 
 * IMPORTANT: withTrace expects the handler to return a NextResponse.json() object.
 * 
 * If you are not returning a NextResponse.json() object, you should not use withTrace.
 * 
 */

const withTrace = (
    handler,
    action,
    sensitivity
) => async (req, res) => {
    // Generate a trace_id for the request.
    const trace_id = generateTraceId();

    const apiKey = await extractApiKey(req);

    try {
        // We don’t parse the trace_id in because we will append it to the response by manipulating the response object.
        const response = await handler(req, res);

        // The response object should be a NextResponse object. If it isn't, we will throw an error.
        if (!(response instanceof NextResponse)) {
            await logRequest({
                trace_id: trace_id,
                action: action,
                sensitivity: "critical", // The logging request has failed - we need to know about it.
                status: 500,
                error: "The response object is not a NextResponse object.\n\nYou must return a NextResponse object from your API route handler when using withTrace.",
            })

            return NextResponse.json(
                {
                    "status": "error",
                    "message": "An error occured when attempting to process your request. Please try again later or contact support quoting this response.",
                    "trace_id": trace_id,
                },
                {
                    status: 500,
                }
            )
        }

        let body = null;

        try {
            body = await response.json();
        } catch (error) {
            // not JSON, but that's fine.
        }
        const status = response.status;

        // log to database
        await logRequest({
            trace_id: trace_id,
            action: action,
            sensitivity: sensitivity,
            status: status,
            request: logRequestDetails ? req : null,
            response: logRequestDetails ? body : null,
            error: null,
            api_key: apiKey,
        })

        // if body is null, return the response object.
        if (!body) return response;

        return NextResponse.json(
            {
                ...body,
                trace_id: trace_id,
            },
            {
                status: status,
            }
        )
    } catch (error) {
        if (error instanceof NextError) error = error.toString();
        if (error instanceof Error) error = error.message;

        // If an error occurs, log it to the database.
        await logRequest({
            trace_id: trace_id,
            action: action,
            status: 500,
            request: logRequestDetails ? req : null,
            response: logRequestDetails ? error : null,
            error: error,
            sensitivity: "critical", // The logging request has failed - we need to know about it.
            api_key: apiKey,
        })

        // Return the error to the client.
        return NextResponse.json(
            {
                "status": "error",
                "message": "An error occured when attempting to process your request. Please try again later or contact support quoting this response.",
                "trace_id": trace_id,
            },
            {
                status: 500,
            }
        )
    }
}

export default withTrace;

function generateTraceId() {
    return "trace-" + randomUUID();
}

async function logRequest({
    trace_id,
    impersonator = null, // If this request was made by an admin impersonating a user, this will be the user_id of the admin.
    action,
    sensitivity = "low", // low, medium, high, critical
    status,
    request = null,
    response = null,
    error = null,
}) {
    if (storeInDatabase) {
        const { db_error } = await app_database
            .from('logs')
            .insert({
                trace_id: trace_id,
                impersonator: impersonator,
                action: action,
                sensitivity: sensitivity,
                status: status,
                request: request,
                response: response,
                error: error,
            })

        if (db_error) {
            await app_database
                .from('logs')
                .insert({
                    trace_id: trace_id,
                    action: "attempt-to-log-request-failed",
                    sensitivity: "critical", // If the logging request has failed, we need to know about it.
                    status: 500,
                    error: "An error occured when attempting to log a request: \n\n" + error,
                })
        }
    } else {
        // If we aren't storing the request in the database, we will log it to Betterstack.
        logtail.error({
            trace_id: trace_id,
            impersonator: impersonator,
            action: action,
            sensitivity: sensitivity,
            status: status,
            request: request,
            response: response,
            error: error,
        })

        logtail.flush();
    }

    return trace_id;
}

async function extractApiKey(req) {
    // api key can be stored in the Authorization header or in the json body as `api_key`
    const headers = NextHeaders();

    const authorization = headers.get('authorization') || null;

    if (authorization) {
        const parts = authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const token = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                return token;
            }
        }
    }

    // If we haven't returned yet, we will check the body
    const body = req.json();

    if (body.api_key) {
        return body.api_key;
    }

    return null;
}
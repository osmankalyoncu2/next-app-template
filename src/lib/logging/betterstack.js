// Betterstack Logging

const BETTERSTACK_TOKEN = process.env.BETTERSTACK_TOKEN;

// Betterstack logging (Logtail) - Backend - Can only be used in the backend

/** Backend Usage:
 * 
 * "use server";
 * 
 * // Importing Backend logger
 * import { logtail } from "@/lib/logging/betterstack";
 * 
 * // Logtail Info
 * logtail.info("Hello World!");
 * 
 * // Logtail Error
 * logtail.error("Hello World!");
 * 
 * // Ensure that logs are sent
 * logtail.flush();
 * 
 */

/**const { Node: Logtail } = require("@logtail/js");

export const logtail = () => {
    if (!BETTERSTACK_TOKEN) return null;

    new Logtail(
        BETTERSTACK_TOKEN
    );
}*/

// Betterstack logging (Logtail) - Frontend - I've called it frontlog to avoid confusion with the backend logger

/** Frontend Usage:
 * 
 * "use client";
 * 
 * // Importing Frontend logger
 * import { frontlog } from "@/lib/logging/betterstack";
 * 
 * // Frontlog Info
 * frontlog.info("Hello World!");
 * 
 * // Frontlog Error
 * frontlog.error("Hello World!");
 * 
 * // Ensure that logs are sent
 * frontlog.flush();
 * 
 */

/**
 * import { Logtail as Browser } from "@logtail/browser";

export const frontlog = () => {
    if (!BETTERSTACK_TOKEN) return null;

    new Browser(
        BETTERSTACK_TOKEN
    );
}*/

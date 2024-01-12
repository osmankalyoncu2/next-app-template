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

const { Node: Logtail } = require("@logtail/js");

export const logtail = new Logtail(
    process.env.BETTERSTACK_TOKEN
);



// TODO: I think the below might not work due to an issue with `process.env.BETTERSTACK_TOKEN` being used on the client side.

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

import { Browser } from "@logtail/browser";

export const frontlog = new Browser(
    process.env.BETTERSTACK_TOKEN
);

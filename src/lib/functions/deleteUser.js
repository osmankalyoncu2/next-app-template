import {
    next_auth_database
} from "@/lib/database/connect";

import SendEmail from "@/emails/SendEmail";

export default async function deleteUser({
    userId,
}) {
    // TODO: This function needs to be completed after I finish the `app` schema

    // Step 0. Send an email to the user letting them know their account has been deleted

    /*SendEmail({
        "to": "user.email",
        "subject": "Your account has been deleted",
        "text": "Your account has been deleted.",
        "html": "Your account has been deleted.",
    })*/

    // Step 1. Delete the user from the database
    const {
        data: user,
        error: error_getting_user
    } = await next_auth_database
        .from('users')
        .select('id')
        .eq('id', userId)

    if (error_getting_user) {
        return {
            "status": "error",
            "message": "Error getting user.",
        };
    }

    if (!user || user.length === 0) {
        return {
            "status": "error",
            "message": "User not found.",
        };
    }

    const {
        error: error_deleting_user
    } = await next_auth_database
        .from('users')
        .delete()
        .eq('id', userId)

    if (error_deleting_user) {
        return {
            "status": "error",
            "message": "Error deleting user.",
        };
    }

    return {
        "status": "success",
        "message": "User deleted.",
    };
}
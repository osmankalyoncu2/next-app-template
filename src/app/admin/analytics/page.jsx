import { auth } from "@/auth/auth";

export default async function AdminAnalyticsPage({

}) {
    const session = await auth();

    return (
        <>
            <h1>
                Admin Page
            </h1>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </>
    )
}
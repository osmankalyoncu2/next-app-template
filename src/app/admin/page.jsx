"use client";

import { useSession } from "next-auth/react"

export default function AdminPage({

}) {
    const { data: session, status } = useSession();

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
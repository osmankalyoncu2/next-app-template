"use client";

import { useEffect, useState } from "react";

export default function ViewLogs({ }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function getLogs() {
            const response = await fetch("/api/admin/logs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setLogs(data.logs);
        }
        getLogs();
    }, []);

    // TODO: Complete the Logs stuff

    return (
        <>
            <pre>
                {JSON.stringify(logs, null, 2)}
            </pre>
        </>
    )
}
"use client";

import Button from "@/components/aui/Button";

export default function GenerateKey() {
    return (
        <Button
            onClick={async () => {
                const response = await fetch('/api/keys', {
                    method: 'POST',
                });

                const data = await response.json();

                console.log(data);
            }}
        >
            Generate API Key
        </Button>
    )
}
export const runtime = "edge";

export const metadata = {
    title: 'Dashboard',
}

import { auth } from "@/auth/auth";
import Title from "@/components/ui/Title";

export default async function Dashboard({

}) {
    const session = await auth();

    return (
        <main
            className=""
        >
            <Title
                title={"Dashboard"}
                subtitle={"Welcome to your dashboard!"}
            />
            <div
                className="my-10 px-6 py-4 border border-primary-800 rounded-3xl bg-primary-900"
            >
                <h3
                    className="text-primary-100 text-2xl"
                >   
                    Hey <span className="underline underline-offset-2 text-primary-50">{session.user.name}</span>! 👋
                </h3>
                <p
                    className="mt-2 text-primary-200 text-sm font-semibold"
                >
                    This is your dashboard - but I think you already knew that!
                </p>
            </div>
        </main>
    )
}
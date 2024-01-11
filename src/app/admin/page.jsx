import Title from "@/components/ui/Title";
import { auth } from "@/auth/auth";

export default async function AdminPage({

}) {
    const session = await auth();

    return (
        <>
            <Title
                title={"Admin Page"}
                subtitle={"Here you can manage your app, view analytics, logs and more."}
            />
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </>
    )
}
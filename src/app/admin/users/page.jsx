import Title from "@/components/aui/Title";
import { auth } from "@/auth/auth";

export default async function UserManagement() {
    const session = await auth();

    return (
        <>
            <Title
                title={"User Management"}
                subtitle={"Manage your users, grant permissions, impersonate and terminate accounts."}
            />
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </>
    )
}
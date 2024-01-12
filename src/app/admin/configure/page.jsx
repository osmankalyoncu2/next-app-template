import Title from "@/components/ui/Title";
import { auth } from "@/auth/auth";
import Test from "./Test";

export default async function AppConfiguration({

}) {
    const session = await auth();

    return (
        <>
            <Title
                title={"App Configuration"}
                subtitle={"Configure your app, change settings, add integrations and more."}
            />
            <Test />
        </>
    )
}
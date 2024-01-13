import Title from "@/components/aui/Title";
import { auth } from "@/auth/auth";

export default async function AppAnalytics({

}) {
    const session = await auth();

    return (
        <>
            <Title
                title={"App Analytics"}
                subtitle={"View the stats of your product."}
            />
        </>
    )
}
import Title from "@/components/aui/Title";
import Test from "./Test";

export default async function AppConfiguration() {

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
import Title from "@/components/ui/Title";
import ViewLogs from "./ViewLogs";

export default async function AppLogs({

}) {
    return (
        <>
            <Title
                title={"App Logs"}
                subtitle={"View the logs you’ve accumulated over time for your app."}
            />
            <ViewLogs />
        </>
    )
}
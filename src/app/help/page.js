import CTACard from "@/components/aui/CTACard";
import Title from "@/components/aui/Title";
import Chat from "./Chat";
import FAQs from "./FAQs";

export const metadata = {
    title: 'Help Centre',
}

export default function HelpPage() {
    // TODO: This needs to be implemented in a separate client component
    // The Intercom component also needs to be updated for this to work with show/hide
    // intercom is enabled if the app id is set
    //const intercom_enabled = AppCustomisation.tools.intercom.enabled && (AppCustomisation.intercom_app_id !== "");

    // if intercom is enabled, then the user can click the button to open the chat
    // otherwise they'll be presented with options to contact support

    return (
        <>
            <Title
                title={'Help Centre'}
                subtitle={'Got a problem? We’re here to help.'}
            />

            <div
                className="grid grid-cols-1 gap-8 md:grid-cols-2 my-10"
            >
                <div className="col-span-1">
                    <Chat />
                </div>
                <div className="col-span-1">
                    <FAQs />
                </div>
                <div
                    className="col-span-1 md:col-span-2"
                >
                    <CTACard
                        title={'Contact Support'}
                        subtitle={'Get help from a human to solve your problem.'}
                        button={'Get in touch →'}
                        href={'mailto:support@makenext.app'}
                    />
                </div>
            </div>
        </>
    )
}
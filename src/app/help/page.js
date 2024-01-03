import Title from "@/components/Title";

export const metadata = {
    title: 'Help Centre',
}

export default function HelpPage({

}) {
    const intercom_app_id = process.env.INTERCOM_APP_ID;

    // intercom is enabled if the app id is set
    const intercom_enabled = intercom_app_id && intercom_app_id.length > 0;

    // if intercom is enabled, then the user can click the button to open the chat
    // otherwise they'll be presented with options to contact support

    // additionally, if an OpenAI API key is set, then the user can interact with the chatbot
    // which builds a knowledge base from the docs (or help centre articles depending on how you configure it) at build time

    const openai_api_key = process.env.OPENAI_API_KEY;

    // openai is enabled if the api key is set
    const openai_enabled = openai_api_key && openai_api_key.length > 0;

    return (
        <>
            <Title
                title={'Help Centre'}
                subtitle={'Got a problem? We’re here to help.'}
            />
        </>
    )
}
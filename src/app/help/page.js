import CTACard from "@/components/ui/CTACard";
import Title from "@/components/ui/Title";
import Chat from "./Chat";

import Markdown from 'react-markdown'

export const metadata = {
    title: 'Help Centre',
}

const faqs = [
    {
        question: 'How do I get started?',
        answer: '[__Download the template__](https://github.com/arsenstorm/next-app-template) and follow the instructions in the README.',
    }
]

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

            <div
                className="grid grid-cols-1 gap-8 md:grid-cols-2 my-10"
            >
                <div className="col-span-1">
                    <Chat />
                </div>
                <div className="col-span-1 border-2 border-primary-700 ring-2 ring-primary-900 ring-offset-2 ring-offset-primary-800 rounded-xl py-4 px-6">
                    <h3 className="text-xl font-bold mb-4">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                className=""
                                key={index}
                            >
                                <h4 className="font-bold">
                                    {faq.question}
                                </h4>
                                <Markdown
                                    className="text-primary-200 text-sm mt-0.5"
                                >
                                    {faq.answer}
                                </Markdown>
                            </div>
                        ))}
                    </div>
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
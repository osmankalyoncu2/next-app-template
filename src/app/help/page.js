import CTACard from "@/components/ui/CTACard";
import Title from "@/components/ui/Title";
import Chat from "./Chat";

import Markdown from 'react-markdown'
import { AppCustomisation } from "@/lib/app/customisation";

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
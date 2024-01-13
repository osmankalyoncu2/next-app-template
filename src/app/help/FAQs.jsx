"use client";

import Markdown from 'react-markdown'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: 'How do I get started?',
        answer: '[__Download the template__](https://github.com/arsenstorm/next-app-template) and follow the instructions in the README.',
    }
]

export default function FAQs({

}) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Frequently Asked Questions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`faq-` + index} key={`faq-` + index}>
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <Markdown
                                    className="text-primary text-sm mt-0.5"
                                >
                                    {faq.answer}
                                </Markdown>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
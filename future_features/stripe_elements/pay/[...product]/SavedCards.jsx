"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SavedCards({
    payment_methods = [],
    price = "$0",
    onSelect = () => { },
}) {
    const fingerprints = Array.from(new Set(payment_methods.map(pm => pm.card.fingerprint)));

    const SchemaSavedCards = z.object({
        card_fingerprint: z.enum(
            fingerprints.map(fingerprint => `fingerprint:${fingerprint}`), {
            required_error: "You must select a payment method.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(SchemaSavedCards),
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSelect)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="card_fingerprint"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>
                                Saved Cards
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {fingerprints.map(fingerprint => (
                                        <FormItem key={fingerprint} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={`fingerprint:${fingerprint}`} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {/* Here you can add logic to display card details like 'Mastercard •••• 1234' */}
                                                {payment_methods.find(pm => pm.card.fingerprint === fingerprint).card.brand.toUpperCase()} •••• {payment_methods.find(pm => pm.card.fingerprint === fingerprint).card.last4}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    Pay {price}
                </Button>
            </form>
        </Form>
    )
}
import ai from "@/lib/ai/configuration";

import { OpenAIStream, StreamingTextResponse } from 'ai';

import { NextResponse } from 'next/server'

import { auth } from "@/auth/auth";

export const runtime = 'edge';

export async function POST(req) {
    const { messages } = await req.json();

    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ message: 'No session or user found' }, { status: 401 })
    }

    if (!process.env.AI_API_KEY) {
        return NextResponse.json(
            {
                message: 'AI is not configured for this app.'
            },
            {
                status: 500
            }
        );
    }

    const response = await ai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: true,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}
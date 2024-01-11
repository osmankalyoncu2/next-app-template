import OpenAI from 'openai';

if (!process.env.AI_API_KEY) {
    throw new Error('An AI API key not set');
}

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
});

export default openai;
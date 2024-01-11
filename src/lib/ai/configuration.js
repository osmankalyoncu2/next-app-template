import OpenAI from 'openai';

let openai = null;

if (process.env.AI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.AI_API_KEY,
        baseURL: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
    });
}

export default openai;
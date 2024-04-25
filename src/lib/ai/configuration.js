import OpenAI from 'openai';

const getOpenAIInstance = () => {
    if (process.env.AI_API_KEY) {
        return new OpenAI({
            apiKey: process.env.AI_API_KEY,
            baseURL: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
        });
    }
    return null;
};

export default getOpenAIInstance;
import { Configuration, OpenAIApi } from "openai";

// Load OpenAI API key from storage
let openai;
chrome.storage.local.get("openaiKey", (data) => {
    const configuration = new Configuration({
        apiKey: data.openaiKey,
    });
    openai = new OpenAIApi(configuration);
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getDefinition") {
        getDefinition(message.word)
            .then((definition) => sendResponse({ definition }))
            .catch((error) => sendResponse({ error: error.message }));
        return true; // Required for async response
    }
});

// Function to get definition using OpenAI
async function getDefinition(word) {
    const prompt = `Explain the term "${word}" in simple terms.`;
    const response = await openai.createCompletion({
        model: "text-davinci-003", // Use GPT-3.5 or GPT-4
        prompt: prompt,
        max_tokens: 100, // Limit the response length
        temperature: 0.7, // Adjust for creativity vs. accuracy
    });

    return response.data.choices[0].text.trim();
}
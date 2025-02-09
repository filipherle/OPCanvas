chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleAIMode") {
        if (message.enabled) {
            resetQuizPage(); // Enable Quiz Mode
        } else {
            revertQuizPage(); // Disable Quiz Mode
        }
        sendResponse({ success: true }); // Send a response back to the popup
    }
});


let autoSimplifyEnabled = false;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleAIMode") {
        autoSimplifyEnabled = message.enabled;
        sendResponse({ success: true });
    }
});

// Function to simplify text using OpenAI
const simplifyText = async (text) => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "getDefinition", word: text }, (response) => {
            if (response.error) {
                reject(response.error);
            } else {
                resolve(response.definition);
            }
        });
    });
};

// Highlight event listener
document.addEventListener("mouseup", async (event) => {
    if (autoSimplifyEnabled) {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            try {
                const simplifiedText = await simplifyText(selectedText);
                // Display the simplified text in a tooltip or alert
                alert(`Simplified "${selectedText}":\n\n${simplifiedText}`);
            } catch (error) {
                console.error("Error simplifying text:", error);
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const quizModeToggle = document.getElementById("quizMode");
    const aiModeToggle = document.getElementById("aiMode");

    // Load saved state from Chrome storage
    chrome.storage.local.get("aiMode", (data) => {
        aiModeToggle.checked = data.aiMode || false;
    });

    aiModeToggle.addEventListener("change", () => {
        const isEnabled = aiModeToggle.checked;

        // Save the new state to Chrome storage
        chrome.storage.local.set({ aiMode: isEnabled }, () => {
            alert(isEnabled ? "AI Mode Activated!" : "AI Mode Deactivated!");
        });

        // Send message to content script to apply changes
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleAIMode", enabled: isEnabled }, (response) => {
                if (response && response.success) {
                    console.log("AI Mode toggled successfully.");
                } else {
                    console.error("Failed to toggle AI Mode.");
                }
            });
        });
    });

    // Load saved state from Chrome storage
    chrome.storage.local.get("quizMode", (data) => {
        quizModeToggle.checked = data.quizMode || false;
    });

    // Toggle event listener
    quizModeToggle.addEventListener("change", () => {
        const isEnabled = quizModeToggle.checked;

        // Save the new state to Chrome storage
        chrome.storage.local.set({ quizMode: isEnabled }, () => {
            alert(isEnabled ? "Quiz Mode Activated!" : "Quiz Mode Deactivated!");
        });

        // Send message to content script to apply changes
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleQuizMode", enabled: isEnabled }, (response) => {
                if (response && response.success) {
                    console.log("Quiz Mode toggled successfully.");
                } else {
                    console.error("Failed to toggle Quiz Mode.");
                }
            });
        });
    });
});
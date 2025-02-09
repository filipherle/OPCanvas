import { RandomDle } from "./scripts/procrastinate";


document.addEventListener("DOMContentLoaded", function () {
    const quizModeToggle = document.getElementById("quizMode");
    const aiModeToggle = document.getElementById("aiMode");
    const lockInModeToggle = document.getElementById("lockInMode");
    const procrastinateButton = document.getElementById('procrastinate')

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

    procrastinateButton.addEventListener('click', RandomDle)

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

 


    chrome.storage.local.get("lockInMode", (data) => {
        lockInModeToggle.checked = data.lockInMode || false;
    });

    // Toggle event listener
    lockInModeToggle.addEventListener("change", () => {
        const isEnabled = lockInModeToggle.checked;

        // Save the new state to Chrome storage
        chrome.storage.local.set({ lockInMode: isEnabled }, () => {
            alert(isEnabled ? "Lock in Mode Activated!" : "Lock in Mode Deactivated!");
        });

        // Send message to content script to apply changes
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleLockInMode", enabled: isEnabled }, (response) => {
                if (response && response.success) {
                    console.log("lock Mode toggled successfully.");
                } else {
                    console.error("Failed to toggle lock in Mode.");
                }
            });
        });
    });
});
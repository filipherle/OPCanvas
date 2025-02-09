document.addEventListener("DOMContentLoaded", function () {
    const quizModeToggle = document.getElementById("quizMode");

    // Load saved state from Chrome storage
    chrome.storage.local.get("quizMode", (data) => {
        quizModeToggle.checked = data.quizMode || false;
    });

    // Toggle event listener
    quizModeToggle.addEventListener("change", () => {
        const isEnabled = quizModeToggle.checked;
        chrome.storage.local.set({ quizMode: isEnabled }, () => {
            alert(isEnabled ? "Quiz Mode Activated!" : "Quiz Mode Deactivated!");
        });

        // Send message to content script to apply changes
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (enabled) => {
                    if (enabled) {
                        console.log("Quiz Mode Activated!");
                        // Add your quiz enhancements here
                    } else {
                        console.log("Quiz Mode Disabled.");
                        // Remove quiz modifications
                    }
                },
                args: [isEnabled]
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const quizModeToggle = document.getElementById("quizMode");
    const lockInModeToggle = document.getElementById("lockInMode");
    const procrastinateButton = document.getElementById("procrastinate");
    const roastButton = document.getElementById("roastButton"); // Correct ID for the button

    roastButton.addEventListener("click", () => {
        // Send message to content script to trigger the roast
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleRoastMode" }, (response) => {
                if (response && response.success) {
                    console.log("Roast button clicked successfully.");
                } else {
                    console.error("Failed to handle Roast button click.");
                }
            });
        });
    });


    procrastinateButton.addEventListener("click", () => {
        // Send message to content script to open a random game
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleProcrastinate" }, (response) => {
                if (response && response.success) {
                    console.log("Procrastinate button clicked successfully.");
                } else {
                    console.error("Failed to handle Procrastinate button click.");
                }
            });
        });
    });

    // Load saved state from Chrome storage
    chrome.storage.local.get("quizMode", (data) => {
        quizModeToggle.checked = data.quizMode || false;
    });

    // Toggle event listener for Quiz Mode
    quizModeToggle.addEventListener("change", () => {
        const isEnabled = quizModeToggle.checked;

        // Save the new state to Chrome storage
        chrome.storage.local.set({ quizMode: isEnabled }, () => {
            console.log(isEnabled ? "Quiz Mode Activated!" : "Quiz Mode Deactivated!");
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
            console.log(isEnabled ? "Lock in Mode Activated!" : "Lock in Mode Deactivated!");
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
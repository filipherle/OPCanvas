document.addEventListener("DOMContentLoaded", function () {
    const quizModeToggle = document.getElementById("quizMode");
    const lockInModeToggle = document.getElementById("lockInMode");
    const procrastinateButton = document.getElementById("procrastinate");
    const roastButton = document.getElementById("roastButton");

    roastButton.addEventListener("click", () => {
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

    chrome.storage.local.get("quizMode", (data) => {
        quizModeToggle.checked = data.quizMode || false;
    });

    quizModeToggle.addEventListener("change", () => {
        const isEnabled = quizModeToggle.checked;

        chrome.storage.local.set({ quizMode: isEnabled }, () => {
            console.log(isEnabled ? "Quiz Mode Activated!" : "Quiz Mode Deactivated!");
        });

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

    lockInModeToggle.addEventListener("change", () => {
        const isEnabled = lockInModeToggle.checked;

        chrome.storage.local.set({ lockInMode: isEnabled }, () => {
            console.log(isEnabled ? "Lock in Mode Activated!" : "Lock in Mode Deactivated!");
        });

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
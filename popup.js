document.getElementById("quizMode").addEventListener("click", () => {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "resetQuizPage" }, (response) => {
            if (response && response.success) {
                alert("Quiz Mode Activated!");
            } else {
                alert("Failed to activate Quiz Mode.");
            }
        });
    });
});

document.getElementById("darkMode").addEventListener("click", () => {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "darkMode" }, (response) => {
            if (response && response.success) {
                alert("Dark Mode!");
            } else {
                alert("Failed");
            }
        });
    });
});
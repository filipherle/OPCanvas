document.getElementById("quizMode").addEventListener("click", () => {
    chrome.storage.local.set({ quizMode: true }, () => {
        alert("Quiz Mode Activated!");
    });
});
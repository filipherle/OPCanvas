
const lockInMode = () => {
    console.log("lock in Mode Activated!");

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }

    var audio = new Audio('https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg');
    audio.play();
}


// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleLockInMode") {
        if (message.enabled) {
            lockInMode();
        } else {
            revertQuizPage(); // Disable Quiz Mode
        }
        sendResponse({ success: true }); // Send a response back to the popup
    }
});
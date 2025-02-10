
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


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleLockInMode") {
        if (message.enabled) {
            lockInMode();
        } else {
            revertQuizPage2(); 
        }
        sendResponse({ success: true });
    }
});

const revertQuizPage2 = () => {
    window.location.reload();
};
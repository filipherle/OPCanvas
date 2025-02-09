
function darkMode() {
    console.log("Dark Mode Activated!");

    // Add a dark mode stylesheet to the page
    const style = document.createElement("style");
    style.id = "dark-mode-styles";
    style.textContent = `
        body {
            background-color: #121212 !important;
            color: #ffffff !important;
        }
        /* Add more styles as needed */
    `;
    document.head.appendChild(style);
}



// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "darkMode") {
        darkMode();
        sendResponse({ success: true }); // Send a response back to the popup
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const quizModeToggle = document.getElementById("quizMode");
    const roastToggle = document.getElementById("roast-message");

    // Load saved state from Chrome storage
    chrome.storage.local.get(["quizMode", "roastMode"], (data) => {
        quizModeToggle.checked = data.quizMode || false;
        roastToggle.checked = data.roastMode || false;
    });

    // Toggle event listener for Quiz Mode
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

    // Toggle event listener for Roast Mode
    roastToggle.addEventListener("change", () => {
        const isEnabled = roastToggle.checked;
        chrome.storage.local.set({ roastMode: isEnabled }, () => {
            alert(isEnabled ? "Roast Mode Activated!" : "Roast Mode Deactivated!");
        });

        // Send message to content script to apply roast functionality
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (enabled) => {
                    if (enabled) {
                        console.log("Roast Mode Activated!");
                        // Trigger roast message
                        roastGrade(getCurrentGrade());
                    } else {
                        console.log("Roast Mode Disabled.");
                        // Disable roast functionality
                    }
                },
                args: [isEnabled]
            });
        });
    });
});

// Function to get the current grade (from Canvas page)
function getCurrentGrade() {
    const gradeElement = document.querySelector('.grade-value');
    if (gradeElement) {
        return parseFloat(gradeElement.innerText.replace('%', '').trim());
    }
    return null;
}

// Function to display a savage roast based on the grade
function roastGrade(grade) {
    const savageRoasts = [
        "Oof, that's a *rough* one. Did you forget about this class? Or is this a cry for help?",
        "Did you actually try, or were you just here for the vibe check?",
        "Not the grade you were hoping for, but at least you didn’t fail *completely*... yet.",
        "This is why we can't have nice things. You’re making us all look bad.",
        "Yikes, that grade’s giving me second-hand embarrassment for you.",
        "Did you even open the textbook, or did you just Google 'how to pass with 50%'?",
        "Is this an F, or are you just *fluent* in failure?",
        "I think your grade just roasted you back, and it's way harsher than I could be.",
        "Well, that grade is a *breathtaking* example of what not to do. Seriously, how?",
        "That grade makes me question every decision I’ve ever made. But mostly yours.",
        "There’s optimism, and then there’s... whatever you just did. *Maybe just stay home next time?*",
        "Like a car crash, I can’t look away. But also, please, stop crashing.",
        "That grade’s giving me second-hand depression. I’m gonna need a minute.",
        "Bro, did you do *anything* for this grade or just exist in the class?",
        "This grade is literally a vibe check, and you FAILED. Hard.",
        "Is this grade real, or are we living in a simulation? Cause this can’t be it.",
        "I’m sending you a link to 'How to be Productive 101,' it’s honestly for your own good.",
        "That grade is like 'oops, I accidentally ate a whole bag of chips' energy. *What were you thinking?*",
        "Ain't no way this is the grade you’ve been working for, what’s going on? Did you even try?",
        "The energy this grade is giving off is straight-up chaotic. Seek help.",
        "You need to be on the ‘*do not disturb*’ list for this one. Just go touch grass.",
        "You are a *walking* ‘are you okay’ meme right now. Go drink some water.",
        "This is what happens when you *literally* don't try. And it shows. Hard.",
        "You just set the bar lower. Like, I didn’t think it was possible, but here we are.",
        "I’m pretty sure this grade is *fake*. Are you sure this is your final grade?",
        "Your grade is literally the definition of ‘who asked?’"
    ];

    let roastMessage = "You're killing it! Just kidding, here's a roast: ";
  
    if (grade !== null) {
      if (grade >= 90) {
        roastMessage = "Wow, A+? Are you trying to make the rest of us look bad? *Send help.*";
      } else if (grade >= 85) {
        roastMessage = "Looking good, but you could still be a little less average. Nice try!";
      } else if (grade >= 70) {
        roastMessage = savageRoasts[0];  // Slightly harsh roast for B-range
      } else if (grade >= 60) {
        roastMessage = savageRoasts[1];  // A bit harsh for C-range
      } else {
        // Randomly pick from the savage roasts
        roastMessage = savageRoasts[Math.floor(Math.random() * savageRoasts.length)];
      }
    } else {
      roastMessage = "Can't find your grade? Guess that’s the best result yet!";
    }

    // Find the element in the popup to display the roast
    const roastElement = document.getElementById('roast-message');
    if (roastElement) {
      roastElement.innerText = roastMessage; // Set the roast message in the div
    }
}

// Function to get the current grade (from Canvas page)
// Function to get the current grade (from Canvas or quiz page)
function getCurrentGrade() {
    // Try finding the grade element from Canvas
    const gradeElement = document.querySelector('.grade');
    const enteredGradeElement = document.querySelector('.entered_grade');
    // Try finding the quiz score element from the quiz page
    const quizScoreElement = document.querySelector('.quiz_score');

    let numerator, denominator;

    // Case 1: Use .grade element (Canvas page)
    if (gradeElement) {
        const gradeText = gradeElement.parentElement.innerText.trim(); // e.g., "10 / 10"
        const [numeratorText, denominatorText] = gradeText.split('/').map((s) => s.trim());
        numerator = parseFloat(numeratorText);
        denominator = parseFloat(denominatorText);
    }
    // Case 2: Use .entered_grade element (Canvas page)
    else if (enteredGradeElement) {
        const enteredGradeText = enteredGradeElement.parentElement.innerText.trim(); // e.g., "10 / 10"
        const [numeratorText, denominatorText] = enteredGradeText.split('/').map((s) => s.trim());
        numerator = parseFloat(numeratorText);
        denominator = parseFloat(denominatorText);
    }
    // Case 3: Use .quiz_score element (Quiz page)
    else if (quizScoreElement) {
        // The quiz_score element looks like:
        // <div class="quiz_score">Score for this quiz:
        //   <span class="score_value">5</span> out of 5
        // </div>
        const scoreValueElement = quizScoreElement.querySelector('.score_value');
        if (scoreValueElement) {
            numerator = parseFloat(scoreValueElement.innerText);
        }
        // Extract the denominator from the text. We look for "out of" followed by a number.
        const quizScoreText = quizScoreElement.textContent;
        const match = quizScoreText.match(/out of\s+(\d+(\.\d+)?)/i);
        if (match) {
            denominator = parseFloat(match[1]);
        }
    }
    // If no recognizable grade element is found, return null
    else {
        return null;
    }

    // Validate that denominator is non-zero and the numbers are valid
    if (denominator === 0 || isNaN(numerator) || isNaN(denominator)) {
        console.error("Invalid grade information: denominator is zero or not a valid number.");
        return null;
    }

    // Calculate and return the percentage
    const percentage = (numerator / denominator) * 100;
    return percentage;
}

function showDialog(message) {
  // Create a new div element and set its HTML content to the provided message using jQuery
  const dialog = $('<div>').html(message);

  // Initialize the jQuery UI dialog with options
  dialog.dialog({
    title: 'Roast:',
    modal: true, // Makes the dialog modal
    buttons: {
      "OK": function() {
        $(this).dialog("close");
      }
    },
    close: function() {
      // Remove the dialog element from the DOM when it is closed
      $(this).remove();
    }
  });
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
        } else if (grade >= 82) {
            roastMessage = "Looking good, but you could still be a little less average. Nice try!";
        } else {
            // For grades below 82, randomly pick from the savage roasts array.
            roastMessage = savageRoasts[Math.floor(Math.random() * savageRoasts.length)];
        }
    } else {
        roastMessage = "Can't find your grade? Guess that’s the best result yet!";
    }

    // Find the element in the popup to display the roast
    //alert(roastMessage);
    showDialog(roastMessage);
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleRoastMode") {
        const currentGrade = getCurrentGrade();
        roastGrade(currentGrade);
        console.log(currentGrade);
        sendResponse({ success: true }); // Send a response back to the popup
    }
});

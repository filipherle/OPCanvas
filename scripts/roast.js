// Function to get the grade of the assignment from the page
function getCurrentGrade() {
    // This assumes the grade is located in an element with a specific class or ID.
    // Adjust the selector as needed based on the actual Canvas page structure.
    const gradeElement = document.querySelector('.grade-value'); // Adjust this selector
    if (gradeElement) {
      return parseFloat(gradeElement.innerText.replace('%', '').trim());
    }
    return null;
  }
  
  // Function to display a savage roast based on the grade
  function roastGrade(grade) {
    // Savage roasts
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
  
  // Function to detect when an assignment link is clicked and trigger the roast
  function setupAssignmentClickListener() {
    const assignmentLinks = document.querySelectorAll('a.assignment-link'); // Adjust based on the Canvas structure
  
    assignmentLinks.forEach(link => {
      link.addEventListener('click', function () {
        // Wait for the page to load before fetching the grade and roasting it
        setTimeout(function () {
          const grade = getCurrentGrade();
          roastGrade(grade); // Display the roast message in the popup
        }, 500); // Delay to allow time for grade to load
      });
    });
  }
  
  // Run the setup function once the page is loaded
  window.addEventListener('load', function () {
    setupAssignmentClickListener();
  });
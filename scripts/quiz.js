const hideIfExists = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
        elem.style.display = "none";
    }
}

const resetStyles = (elements, styleProperty, value) => {
    elements.forEach((elem) => elem.style[styleProperty] = value);
}

const removeClass = (elements, className) => {
    elements.forEach((elem) => elem.classList.remove(className));
}

const resetInputs = (inputs) => {
    inputs.forEach((input) => input.checked = false);
}

const resetSelects = (selects) => {
    selects.forEach((select) => select.innerText = "");
}

const resetTitles = (elements) => {
    elements.forEach((elem) => elem.title = "");
}

const resetValues = (elements) => {
    elements.forEach((elem) => elem.value = "");
}

const hideElements = (elements) => {
    elements.forEach((elem) => elem.style.display = "none");
}

// Main function to reset the quiz page
// Function to reset the quiz page
const resetQuizPage = () => {
    // Reset greyed out questions
    const greyedOutQuestions = Array.from(document.querySelectorAll(".answer")).filter((elem) => window.getComputedStyle(elem).opacity == 0.5);
    resetStyles(greyedOutQuestions, 'opacity', 1);

    // Hide arrows
    const arrows = Array.from(document.querySelectorAll("[class*=answer_arrow]"));
    hideElements(arrows);

    // Remove red outline from wrong answers
    const redOutline = Array.from(document.querySelectorAll(".wrong_answer"));
    removeClass(redOutline, 'wrong_answer');

    // Uncheck all inputs
    const inputs = Array.from(document.getElementsByTagName("input"));
    resetInputs(inputs);

    // Hide points
    const points = Array.from(document.querySelectorAll("[class*=user_points]"));
    hideElements(points);

    // Hide comments
    const comments = Array.from(document.querySelectorAll("[class*=quiz_comment]"));
    hideElements(comments);

    // Reset selects
    const selects = Array.from(document.getElementsByTagName("select"));
    resetSelects(selects);

    // Reset selected answers
    const selectedAnswers = Array.from(document.querySelectorAll("[class*=selected_answer]"));
    resetTitles(selectedAnswers);

    // Reset number inputs
    const numberInputs = Array.from(document.querySelectorAll("[class*=numerical_question_input]"));
    resetValues(numberInputs);

    // Hide numerical answers
    const numericalAnswers = Array.from(document.querySelectorAll("[class*=numerical_exact_answer]"));
    hideElements(numericalAnswers);

    // Extra cleanup to make print out look better
    hideIfExists("module_sequence_footer");

    // Hide unnecessary elements
    Array.from(document.querySelectorAll("[class*=quiz-header] > div")).forEach((d) => d.style.display = "none");
    Array.from(document.querySelectorAll(".quiz-submission > *")).filter((div) => div.id != "questions").forEach((div) => div.style.display = "none");
    Array.from(document.querySelectorAll("#wrapper > *")).filter((div) => div.id != "main").forEach((div) => div.style.display = "none");
};

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "resetQuizPage") {
        resetQuizPage();
        sendResponse({ success: true }); // Send a response back to the popup
    }
});
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

const resetQuizPage = () => {
    const greyedOutQuestions = Array.from(document.querySelectorAll(".answer")).filter((elem) => window.getComputedStyle(elem).opacity == 0.5);
    resetStyles(greyedOutQuestions, 'opacity', 1);

    const arrows = Array.from(document.querySelectorAll("[class*=answer_arrow]"));
    hideElements(arrows);

    const redOutline = Array.from(document.querySelectorAll(".wrong_answer"));
    removeClass(redOutline, 'wrong_answer');

    const inputs = Array.from(document.getElementsByTagName("input"));
    resetInputs(inputs);

    const points = Array.from(document.querySelectorAll("[class*=user_points]"));
    hideElements(points);

    const comments = Array.from(document.querySelectorAll("[class*=quiz_comment]"));
    hideElements(comments);

    const selects = Array.from(document.getElementsByTagName("select"));
    resetSelects(selects);

    const selectedAnswers = Array.from(document.querySelectorAll("[class*=selected_answer]"));
    resetTitles(selectedAnswers);

    const numberInputs = Array.from(document.querySelectorAll("[class*=numerical_question_input]"));
    resetValues(numberInputs);

    const numericalAnswers = Array.from(document.querySelectorAll("[class*=numerical_exact_answer]"));
    hideElements(numericalAnswers);

    hideIfExists("module_sequence_footer");

    Array.from(document.querySelectorAll("[class*=quiz-header] > div")).forEach((d) => d.style.display = "none");
    Array.from(document.querySelectorAll(".quiz-submission > *")).filter((div) => div.id != "questions").forEach((div) => div.style.display = "none");
    Array.from(document.querySelectorAll("#wrapper > *")).filter((div) => div.id != "main").forEach((div) => div.style.display = "none");
};


const revertQuizPage = () => {
    window.location.reload();
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleQuizMode") {
        if (message.enabled) {
            resetQuizPage(); 
        } else {
            revertQuizPage(); 
        }
        sendResponse({ success: true }); 
    }
});
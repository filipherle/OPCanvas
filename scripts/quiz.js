const hideIfExists = (id) => {
    var elem = document.getElementById(id);
    if (elem) {
        elem.style.display = "none";
    }
}

var greyedOutQuestions = Array.from(document.querySelectorAll(".answer")).filter((elem) => window.getComputedStyle(elem).opacity == 0.5);
greyedOutQuestions.forEach((q) => q.style.opacity = 1);

var arrows = Array.from(document.querySelectorAll("[class*=answer_arrow]"));
arrows.forEach((a) => a.style.display = "none");

var redOutline = Array.from(document.querySelectorAll(".wrong_answer"));
redOutline.forEach((r) => r.classList.remove("wrong_answer"));

var inputs = Array.from(document.getElementsByTagName("input"));
inputs.forEach((i) => i.checked = false);

var points = Array.from(document.querySelectorAll("[class*=user_points]"));
points.forEach((p) => p.style.display = "none");

var comments = Array.from(document.querySelectorAll("[class*=quiz_comment]"));
comments.forEach((c) => c.style.display = "none");

var selects = Array.from(document.getElementsByTagName("select"));
selects.forEach((s) => s.innerText = "");

var selectedAnswers = Array.from(document.querySelectorAll("[class*=selected_answer]"));
selectedAnswers.forEach((ans) => ans.title = "")

var numberInputs = Array.from(document.querySelectorAll("[class*=numerical_question_input]"));
numberInputs.forEach((num) => num.value = "");

var numericalAnswers = Array.from(document.querySelectorAll("[class*=numerical_exact_answer]")); 
numericalAnswers.forEach((ans) => ans.style.display = "none");

// Extra cleanup to make print out look better
hideIfExists("header");
hideIfExists("left-side");
hideIfExists("right-side-wrapper");
hideIfExists("module_sequence_footer");

Array.from(document.querySelectorAll("[class*=quiz-header] > div")).forEach((d) => d.style.display = "none");
Array.from(document.querySelectorAll(".quiz-submission > *")).filter((div) => div.id != "questions").forEach((div) => div.style.display = "none");
Array.from(document.querySelectorAll("#wrapper > *")).filter((div) => div.id != "main").forEach((div) => div.style.display = "none");
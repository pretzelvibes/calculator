const btnChangeSign = document.querySelector("#changeSign");
const btnZero = document.querySelector("#zero");
const btnDot = document.querySelector("#dot");
const btnOne = document.querySelector("#one");
const btnTwo = document.querySelector("#two");
const btnThree = document.querySelector("#three");
const btnFour = document.querySelector("#four");
const btnFive = document.querySelector("#five");
const btnSix = document.querySelector("#six");
const btnSeven = document.querySelector("#seven");
const btnEight = document.querySelector("#eight");
const btnNine = document.querySelector("#nine");
const btnPlus = document.querySelector("#plus");
const btnMinus = document.querySelector("#minus");
const btnPer = document.querySelector("#per");
const btnEqual = document.querySelector("#equal");
const btnDivide = document.querySelector("#divide");
const btnPercent = document.querySelector("#percent");
const btnClear = document.querySelector("#clear");
const btnClearDisplay = document.querySelector("#clearDisplay");
const displayHistory = document.querySelector("#history");
const display = document.querySelector("#display");

btnChangeSign.addEventListener("click", () => appendNumber("-"));
btnZero.addEventListener("click", () => appendNumber("0"));
btnDot.addEventListener("click", () => appendNumber("."));
btnOne.addEventListener("click", () => appendNumber("1"));
btnTwo.addEventListener("click", () => appendNumber("2"));
btnThree.addEventListener("click", () => appendNumber("3"));
btnFour.addEventListener("click", () => appendNumber("4"));
btnFive.addEventListener("click", () => appendNumber("5"));
btnSix.addEventListener("click", () => appendNumber("6"));
btnSeven.addEventListener("click", () => appendNumber("7"));
btnEight.addEventListener("click", () => appendNumber("8"));
btnNine.addEventListener("click", () => appendNumber("9"));
btnPlus.addEventListener("click", () => appendOperator("+"));
btnMinus.addEventListener("click", () => appendOperator("-"));
btnPer.addEventListener("click", () => appendOperator("*"));
btnEqual.addEventListener("click", calculate);
btnDivide.addEventListener("click", () => appendOperator("/"));
btnPercent.addEventListener("click", () => appendOperator("%"));
btnClear.addEventListener("click", clear);
btnClearDisplay.addEventListener("click", clearDisplay);

let currentInput = "";
let operator = null;
let previousValue = "";
let history = "";
let calculationComplete = false;

function appendNumber(number) {
    if (calculationComplete) {
        if (number === "-") {
            toggleNegativeSign(true);
        } else {
            reset();
            calculationComplete = false;
            currentInput = number;
        }
    } else {
        if (number === ".") {
            toggleDot();
        } else {
            currentInput += number;
        }
    }
    updateDisplay(currentInput || previousValue);
}

function toggleDot() {
    if (!currentInput.includes(".")) {
        currentInput += currentInput ? "." : "0.";
    }
}

function toggleNegativeSign(applyToPrevious = false) {
    if (calculationComplete) {
        if (applyToPrevious) {
            previousValue = previousValue.startsWith("-")
                ? previousValue.slice(1)
                : "-" + previousValue;
            updateDisplay(previousValue);
        }
    } else {
        if (applyToPrevious) {
            previousValue = previousValue.startsWith("-")
                ? previousValue.slice(1)
                : "-" + previousValue;
        } else {
            currentInput = currentInput.startsWith("-")
                ? currentInput.slice(1)
                : "-" + currentInput;
        }
        updateDisplay(currentInput || previousValue);
    }
}

function appendOperator(op) {
    if (calculationComplete) {
        calculationComplete = false;
    }
    if (currentInput === "" && previousValue === "") return;
    if (currentInput !== "") {
        if (previousValue === "") {
            previousValue = currentInput;
        } else if (operator) {
            calculate();
        }
    }
    updateHistory(previousValue + op);
    operator = op;
    currentInput = "";
}

function calculate() {
    if (currentInput === "" || !operator) return;
    let result = operate(parseFloat(previousValue), parseFloat(currentInput), operator);
    result = (Number((result).toFixed(10))).toString();
    updateHistory(displayHistory.textContent + currentInput + "=");
    updateDisplay(result);
    reset(result);
    calculationComplete = true;
}

function operate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Error";
        default: return 0;
    }
}

function clearDisplay() {
    currentInput = "";
    previousValue = "";
    operator = null;
    updateDisplay("0");
    updateHistory("-");
}

function clear() {
    currentInput = "";
    updateDisplay("0");
}

function updateDisplay(value) {
    display.textContent = value;
}

function updateHistory(value) {
    displayHistory.textContent = value;
}

function reset(result) {
    currentInput = "";
    previousValue = result || "";
    operator = null;
}
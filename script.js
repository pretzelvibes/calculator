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
const btnClearEntry = document.querySelector("#clearEntry");
const btnClearAll = document.querySelector("#clearAll");
const historyDisplay = document.querySelector("#history");
const display = document.querySelector("#display");
const btnOperator = document.querySelectorAll(".operator");

btnChangeSign.addEventListener("click", handleChangeSign);
btnZero.addEventListener("click", () => handleNumber("0"));
btnDot.addEventListener("click", () => handleDecimal);
btnOne.addEventListener("click", () => handleNumber("1"));
btnTwo.addEventListener("click", () => handleNumber("2"));
btnThree.addEventListener("click", () => handleNumber("3"));
btnFour.addEventListener("click", () => handleNumber("4"));
btnFive.addEventListener("click", () => handleNumber("5"));
btnSix.addEventListener("click", () => handleNumber("6"));
btnSeven.addEventListener("click", () => handleNumber("7"));
btnEight.addEventListener("click", () => handleNumber("8"));
btnNine.addEventListener("click", () => handleNumber("9"));
btnPlus.addEventListener("click", () => handleOperator("+"));
btnMinus.addEventListener("click", () => handleOperator("-"));
btnPer.addEventListener("click", () => handleOperator("*"));
btnEqual.addEventListener("click", handleEqual);
btnDivide.addEventListener("click", () => handleOperator("/"));
btnPercent.addEventListener("click", handlePercent);
btnClearEntry.addEventListener("click", clearEntry);
btnClearAll.addEventListener("click", clearCalculator);

let currentInput = "";
let previousValue = "";
let operator = null;
let calculationComplete = false;
let operationHistory = "";
let onError = false;

function handleNumber(number) {
    if (onError) {
        toggleButtonsOnError(false);
        historyDisplay.textContent = "";
        onError = false;
    }
    if (currentInput === "0" && number === "0") return;
    if (calculationComplete) {
        currentInput = "";
        calculationComplete = false;
    }
    currentInput += number;
    updateDisplay(currentInput);
}

function handleOperator(selectedOperator) {
    if (currentInput === "" && previousValue === "") currentInput = "0";
    if (previousValue !== "" && currentInput !== "") {
        const tempPrevious = previousValue;
        const tempOperator = operator;
        const tempCurrent = currentInput;
        calculate();
        operationHistory = tempPrevious + tempOperator + tempCurrent + "=";
    }
    operator = selectedOperator;
    previousValue = currentInput || previousValue;
    currentInput = "";
    updateHistory();
}

function handleEqual() {
    if (onError) {
        toggleButtonsOnError(false);
        display.textContent = "";
        historyDisplay.textContent = "";
        onError = false;
    }
    if (previousValue === "" || operator === null) return;
    if (currentInput === "") currentInput = "0";
    operationHistory = previousValue + operator + currentInput + "=";
    calculate();
    updateHistory(true);
    calculationComplete = true;
    operator = null;
}

function handleDecimal() {
    if (calculationComplete) {
        currentInput = "";
        calculationComplete = false;
    }
    if (!currentInput.includes(".")) {
        currentInput += currentInput ? "." : "0.";
        btnDot.disabled = true;
    }
    updateDisplay(currentInput);
}

function handlePercent() {
    if (currentInput === "") return;
    if (previousValue === "") {
        currentInput = "0";
    } else {
        if (operator === "+" || operator === "-"){
            currentInput = parseFloat(previousValue) * parseFloat(currentInput) / 100;
        } else if (operator === "*" || operator === "/") {
            currentInput = parseFloat(currentInput) / 100;
        }
    }
    updateDisplay(currentInput);
    updateHistory();
}

function handleChangeSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    } else if (previousValue && !currentInput && !calculationComplete) {
        previousValue = (parseFloat(previousValue) * -1).toString();
        updateDisplay(previousValue);
    } else if (previousValue && calculationComplete) {
        previousValue = (parseFloat(previousValue) * -1).toString();
        updateDisplay(previousValue);
    }
}


function calculate() {
    const a = parseFloat(previousValue);
    const b = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b !== 0 ? a / b : "Error";
            break;
        default:
            return;
    }

    if (result === "Error") {
        updateDisplay("Cannot divide by zero");
        resetCalculationState();
        toggleButtonsOnError(true);
        onError = true;
        return;
    }

    result = Number(result.toFixed(10));
    previousValue = result.toString();
    currentInput = "";
    updateDisplay(result);
}

function resetCalculationState() {
    currentInput = "";
    previousValue = "";
    operator = null;
    calculationComplete = true;
}


function clearCalculator() {
    currentInput = "";
    previousValue = "";
    operator = null;
    calculationComplete = false;
    operationHistory = "";
    updateDisplay(0);
    historyDisplay.textContent = "";
}

function clearEntry() {
    currentInput = "";
    updateDisplay(0);
}

function toggleButtonsOnError(state = false) {
    btnDot.disabled = state;
    btnPercent.disabled = state;
    btnChangeSign.disabled = state;
    btnOperator.forEach(button => {
        button.disabled = state;
    });
}

function updateDisplay(value) {
    display.textContent = value;
}

function updateHistory(isEqual = false) {
    if (isEqual) {
        historyDisplay.textContent = operationHistory;
    } else if (previousValue && operator) {
        historyDisplay.textContent = previousValue + operator + currentInput;
    } else {
        historyDisplay.textContent = currentInput;
    }
}

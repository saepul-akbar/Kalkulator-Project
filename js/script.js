let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const mainDisplay = document.getElementById('main-display');
const historyDisplay = document.getElementById('history-display');

function updateDisplay() {
    mainDisplay.innerText = currentInput;
    if (operator) {
        historyDisplay.innerText = `${previousInput} ${operator}`;
    } else {
        historyDisplay.innerText = '';
    }
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay()
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = current === 0 ? 'Error' : prev / current;
            break
        default:
            return;
    }

    if (result === 'Error') {
        currentInput = 'Error';
    } else {
        currentInput = result.toString().length > 10 ? result.toPrecision(8).toString() : result.toString();
    }

    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}
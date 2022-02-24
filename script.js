let displayValue = "0";
let secondValue = "0";
let operator = null;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, operator) {
    return operator(x, y);
}

function clickOperand(e) {
    if (displayValue === "0") {
        displayValue = this.value;
    } else {
        displayValue += this.value;
    }
    updateDisplay();
}

function updateDisplay() {
    const display = document.querySelector('#display');
    display.textContent = displayValue;
}

function clear(e) {
    displayValue = "0";
    secondValue = "0";
    operator = null;
    updateDisplay();
}

const operandButtons = document.querySelectorAll('.operand');
operandButtons.forEach(button => button.addEventListener('click', clickOperand));
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);
updateDisplay();

let displayValue = "0"
let accumulator = 0;
let operand = 0;
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
    // operand being equal to null indicates that the user last clicked 
    // an operator button meaning that if they type in more numbers, we should 
    // overwrite the displayed value
    if (displayValue === "0" || operand === null) {
        displayValue = this.value;
    } else {
        displayValue += this.value;
    }
    updateDisplay();
    // keep operand value updated
    operand = parseFloat(displayValue);
}

function clickDecimal(e) {
    if (displayValue.includes(".")) {
        // if we already have a decimal point, then we disable the button.
        return;
    }
    displayValue += this.value;
    updateDisplay();
}

function clickOperator(e) {
    // first calculate the previous operation, if any
    if (operator)
        accumulator = operate(accumulator, operand, operator);
    // if there is no operator, move the operand value into the accumulator, if not null
    else if (operand)
        accumulator = operand;
    // then set the new operator
    switch (this.value) {
        case "+":
            operator = add;
            break;
        case "-":
            operator = subtract;
            break;
        case "*":
            operator = multiply;
            break;
        case "/":
            operator = divide;
            break;
        case "=":
            operator = null;
            break;
    }
    // update display with accumulator
    displayValue = accumulator.toString();
    updateDisplay();
    // set operand to null to specify that the next number button clicked is
    // the start of a new operand
    operand = null; 
}

function updateDisplay() {
    if (displayValue.length > 10) {
        // TODO: add conversion to scientific notation when necessary
        // calculate how many digits we need to remove
        let lengthToRemove = displayValue.length - 10;
        const split = displayValue.split('.');
        if (split[1]) {
            // reduce the fraction to the desired number of digits 
            let newFraction = Math.round(parseInt(split[1]) / 10 ** lengthToRemove).toString();
            displayValue = [split[0], newFraction].join('.');
        } else {
            // if the number is too big, prevent it from leaving the display
            displayValue = Math.floor(parseInt(displayValue) / 10 ** lengthToRemove).toString();
        }
    }
    const display = document.querySelector('#display');
    display.textContent = displayValue;
}

function clear(e) {
    displayValue = "0";
    accumulator = 0;
    operand = 0;
    operator = null;
    updateDisplay();
}

// add functions to all the buttons
const operandButtons = document.querySelectorAll('.operand');
operandButtons.forEach(button => button.addEventListener('click', clickOperand));
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => button.addEventListener('click', clickOperator));
const decimalButton = document.querySelectorAll('.decimal');
decimalButton.forEach(button => button.addEventListener('click', clickDecimal));
const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', clickOperator);
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

// start fresh
clear();

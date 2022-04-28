//If a number is clicked:
// If no operator is selected, append the first num
// Else append the second num

//If an operator is clicked
// If an operator is already selected
//  Evaluate the expression and push second num's value to first num, select the operator
// If an operator is not selected and first num isn't empty, select the operator

const numbers = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector("#equals");

const outputSpace = document.querySelector(".output");

let firstNum = '';
let secondNum = '';
let result;
let operator;

function darkenOnClick(button, color) {
    button.addEventListener('mousedown', () => {
        button.style.backgroundColor = color;
    })

    button.addEventListener('mouseup', () => {
        button.style.backgroundColor = '';
    })
}

function updateOutput() {
    outputSpace.textContent = firstNum;
    if (operator) outputSpace.textContent += ' ' + operator.textContent + ' ';
    if (secondNum) outputSpace.textContent += secondNum;
    if (outputSpace.textContent.length > 20) outputSpace.textContent = 'ERROR';
}

function evaluate() {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);
    if (operator.id === 'add') result = firstNum + secondNum;
    else if (operator.id === 'subtract') result = firstNum - secondNum;
    else if (operator.id === 'multiply') result = firstNum * secondNum;
    else if (operator.id === 'divide') result = firstNum / secondNum;

    result = result.toString()
    firstNum = result;
    operator = undefined;
    secondNum = '';
}

numbers.forEach(button => darkenOnClick(button, "rgb(170, 170, 170"));
operatorButtons.forEach(button => darkenOnClick(button, "rgb(174, 128, 36)"))
darkenOnClick(equalsButton, "rgb(174, 128, 36)");
darkenOnClick(decimalButton, "rgb(170, 170, 170)");
darkenOnClick(clearButton, "rgb(135, 18, 18)");
darkenOnClick(deleteButton, "rgb(135, 18, 18)");

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (!operator){
            if (firstNum === result) {
                firstNum = '';
                result = undefined;
            }
            firstNum += number.textContent;
        }
        else {
            secondNum += number.textContent;
        }
        updateOutput();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!secondNum) {
            if (firstNum[firstNum.length-1] !== '.') {
                if (!operator) operator = button;
            }
        }
        else {
            if (secondNum[secondNum.length-1] !== '.') {
                evaluate();
                operator = button;
            }
        }
        updateOutput();
    })
})

equalsButton.addEventListener('click', () => {
    if (secondNum && secondNum[secondNum.length-1] !== '.') {
        evaluate();
        updateOutput();
    }
})

decimalButton.addEventListener('click', () => {
    if(!operator){
        if (!firstNum.includes('.')){
            if (firstNum === result) {
                result = undefined;
                firstNum = '0.';

            }
            else if (firstNum) firstNum += '.';
            else firstNum = '0.'
        }
    }

    else {
        if (!secondNum.includes('.')) {
            if (secondNum) secondNum += '.'
            else secondNum += '0.'
        }
    }
    updateOutput()
})

clearButton.addEventListener('click', () => {
    firstNum = '';
    secondNum = '';
    operator = undefined;
    result = undefined;
    updateOutput()
})

deleteButton.addEventListener('click', () => {
    if (!operator) {
        if (firstNum.length === 1) firstNum = '';
        else firstNum = firstNum.slice(0, firstNum.length - 1);
    }
    else if (!secondNum) operator = undefined;
    else secondNum  = secondNum.slice(0, secondNum.length-1);
    updateOutput();
})
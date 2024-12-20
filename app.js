/*-------------------------------- Constants --------------------------------*/

const display = document.querySelector('.display'); // The display where the result will be shown

/*-------------------------------- Variables --------------------------------*/

let currentInput = ''; // Holds the current input on the display
let previousInput = ''; // Holds the previous input (for operations)
let operator = ''; // Holds the current operator
let result = null; // Holds the result of the operation

/*------------------------ Cached Element References ------------------------*/

const buttons = document.querySelectorAll('.button'); // All the calculator buttons
const equalsButton = document.querySelector('.equals'); // Equals button
const clearButton = document.querySelector('.C'); // Clear button (ensure the selector is correct)

/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const value = event.target.innerText;
  
      // If it's a number, append it to the current input
      if (value >= '0' && value <= '9') {
        currentInput += value;
        display.innerText = currentInput;
      } 
  
      // If it's an operator, store the current input and operator
      else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (currentInput === '') return; // Avoid storing an operator without a number
  
        if (previousInput !== '') {
          calculate(); // If there's a previous input, calculate first
        }
        operator = value;
        previousInput = currentInput;
        currentInput = ''; // Reset current input for the next number
      } 
      
      // If it's equals, calculate the result
      else if (value === '=') {
        if (previousInput !== '' && currentInput !== '') {
          calculate();
          display.innerText = result; // Display the result
          currentInput = result; // Use the result for further operations
          previousInput = ''; // Clear the previous input
          operator = ''; // Clear the operator
        }
      }
    });
  });
  
/*-------------------------------- Functions --------------------------------*/

// Clear button functionality
clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.innerText = '0';
  });
  
  // Function to perform calculations
  function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
  
    if (operator === '+') {
      result = prev + current;
    } else if (operator === '-') {
      result = prev - current;
    } else if (operator === '*') {
      result = prev * current;
    } else if (operator === '/') {
      if (current === 0) {
        result = 'Error'; // Division by zero check
      } else {
        result = prev / current;
      }
    }
  }
//Criei uma constante que recebe um único elemento lá do meu css
//document.querySelector = esse cara seleciona apenas um valor
//seleciono todos os métodos
const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");
//esse variável está recebendo os  valores em forma de array
//console.log(buttons)

/*Lógica da aplicação*/
class Calculator {

    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //add digit to calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen()
}

//Process all calculator operations
processOperation(operation) {
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        if(this.previousOperationText.innerText !== "") {
           this.changeOperation(operation);
        }
        return;
    }
    
    //GET current and previous value
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch(operation) {
        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous);
            break;

        case "DEL":
               this.processDe1operator();
               break
        case "CE" :
            this.processClearCurrentOperation();
        break
        case "C" :
            this.processClearAll();
            break;
        case "=" :
            this.processEqualOperator();
            break
            default:
            return;
       
    }
        
        

}

// Change values of calculator screen
updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero, if is just add current value
      if (previous === 0) {
        operationValue = current;
      }
      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  //Change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];

    if (!mathOperations.includes(operation)){
        return;
    }
    this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  //Delete the last digit
  processDe1operator() {
        this.currentOperationText.innerText =  
        this.currentOperationText.innerText.slice(0, -1);
  }

  //Delete the current operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";

  }
  //Delete the previous operation
   processClearAll() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
}
    //process an operation
    processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
    
}
}

const calc = new Calculator(previousOperationText, currentOperationText)

/*Eventos que iremos adicionar*/ 
/*pegando cada um dos botões*/
buttons.forEach((btn) => {
    /*dentro de cada um dos botões estou colocando um evento*/
    btn.addEventListener("click", (e) => {
        //consigo pegar o valor do botão que a pessoa clicou
        const value = e.target.innerText;
        if(+value >=0 || value === "." ) {
        calc.addDigit(value);
        } else {
            calc.processOperation(value)
        }

    })
})
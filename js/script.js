(function() {
    "use strict";
  
    var studs = document.getElementsByClassName("stud");
    for (var i = 0; i < studs.length; i++) { 
      studs[i].addEventListener('click', function() { 
        mathOperation(this);
      });
    }
  
    // Clear button functionality
    var clear = document.getElementById('clear');
    clear.addEventListener('click', function() {
      display.innerHTML = "0";
      setNumber = "";
      operationArr = [];
      total = "";
      clear.classList.remove('animate');
    });
  
    var display = document.getElementById('display');
    var decimal = document.getElementById('decimal');
    var operationArr = [];
    var setNumber = "";
    var total = "";
    var count = 0;
  
    function mathOperation(studPressed) {
  
      var num = studPressed.dataset.num;
      var op = studPressed.dataset.op;
      
      var tooLargeOfNumber = function(x) {
        if (x.length >= 11) {
          total = "ERROR";
          display.innerHTML = total;
          clear.className += 'animate';
        }
      }
  
      if (total == 'ERROR') {
        return;
      } else {
        // All Numbers
        if (num) {
          if (total.length > 0) {
            total = "";
            operationArr = [];
          }
          if (num === '.') {
            count++
            console.log(count);
            if (count > 1) {
              this.removeEventListener('click');
            }
          }
          setNumber += num;
          display.innerHTML = setNumber;
          tooLargeOfNumber(setNumber);
        }
        
        // All operators
        if (op === '+' || op === '-' || op === "*" || op === '/') {
          if (total.length > 0) {
            operationArr = [];
            operationArr.push(total);
            total = "";
            operationArr.push(op);
          }
          if (setNumber.length !== 0) {
            operationArr.push(setNumber);
            operationArr.push(op);
            setNumber = "";
            count = 0;
          }
          if((operationArr.length % 2) == 0) {
            operationArr.pop();
            operationArr.push(op);
          }
          console.log(operationArr);
        }
  
        // Equals
        if (op === '=') {
  
          if (total > 0) {
            operationArr = operationArr.slice( ((operationArr.length) - 2), operationArr.length);
            operationArr.unshift(total);
            total = eval(operationArr.join("")).toString();
            display.innerHTML = total;
          }
  
          if (setNumber.length !== 0 && operationArr.length !== 0) {
            operationArr.push(setNumber);
  
            if ((operationArr.length % 2) == 1) {
              total = eval(operationArr.join(""));
              if (!(Number.isInteger(total)) && total == 'Infinity') {
                total = "ERROR";
                clear.className += 'animate';
              } else if (!(Number.isInteger(total))) {
                total = total.toFixed(2).toString();
              } else {
                total = total.toString();
              }

              display.innerHTML = total;
              setNumber = "";
              count = 0;
            }
          }
          tooLargeOfNumber(total);
        }
      }
    }
  
  })();

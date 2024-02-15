let historybutton = document.getElementById('historybutton');
let history = document.getElementById('history');
let bar1 = document.getElementById('bar1');
let bar2 = document.getElementById('bar2');
let dis=document.getElementById('answer');

function showHistory() {
    let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    let len = calcHistory.length;

    history.innerHTML = '';

    bar1.style.display = 'block';
    bar2.style.display = 'block';
    if (len === 0) {
        let historyItem = document.createElement('div');
        historyItem.innerHTML = "There's no history yet.";
        historyItem.className = 'historyelement his';
        historyItem.style.fontSize = '25px';
        history.appendChild(historyItem);
    } else {
        for (let index = len-1; index >=0; index--) {
            const element = calcHistory[index];
            let historyItem = document.createElement('div');
            historyItem.className = 'historyelement';
            historyItem.innerHTML = `${element.lastScreenValue} = <span style="color: ${element.result < 0 ? 'red' : 'green'}">${element.result}</span>`;//Actually I have added this that makes red color in the history section .............
            history.appendChild(historyItem);
            if (index > 0) history.appendChild(document.createElement('hr'));
        }
    }

    history.style.display = 'block';
}

historybutton.addEventListener('click', showHistory);

function clearAll(){
    dis.value=''
}

function hide(){
    history.style.display = 'none';
    bar1.style.display = 'none';
    bar2.style.display = 'none';
}
function deleteLastEntry() {
    let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    if (calcHistory.length > 0) {
      calcHistory.pop(); 
      localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
      showHistory(); // It open each time when u click on CE if u dont want then u can remove it ....
    }
  }



bar1.addEventListener('click', hide);
bar2.addEventListener('click', hide);






console.log(
    "Javascript Calculator Made by Harsh Trivedi\nhttps://harsh98trivedi.github.io"
  );
  let flag = 0;
  
  function isNumber(char) {
    return /^\d$/.test(char);
  }
  
  document.getElementById("answer").readOnly = true;
  let screen = document.getElementById("answer");
  buttons = document.querySelectorAll("button");
  let screenValue = "";
  let lastScreenValue = "";
  let maxItems = 6;
  let isSign = true;
  
  for (item of buttons) {
    item.addEventListener("click", (e) => {
      buttonText = e.target.innerText;
      if (buttonText == "X" && !isSign) {
        if (flag == 1) {
          flag = 0;
        }
        buttonText = "*";
        isSign = true;
        screenValue += buttonText;
        screen.value = screenValue;
      } else if (buttonText == "C") {
        if (flag == 1) {
          flag = 0;
        }
        screenValue = "";
        screen.value = screenValue;
        screen.classList.remove("negative"); // Remove negative class
        isSign = true;
      } else if (buttonText == "=") {
        checkForBracketMulti();
        if (parseFloat(screen.value) < 0) {
          screen.classList.add("negative");
        } else {
          screen.classList.remove("negative");
        }
      } else if(buttonText=="(" || buttonText==")") {
        if(flag==1){
          flag =0;
        }
        screenValue+=buttonText;
        screen.value=screenValue;
      } 
      else if (isNumber(buttonText)) {
        if (flag == 1) {
          screenValue = buttonText;
          flag = 0;
        } else {
          screenValue += buttonText;
        }
        screen.value = screenValue;
        isSign = false;
        screen.classList.remove("negative"); // Remove negative class
      } else {
        if (flag == 1) {
          flag = 0;
        }
        if (!isSign) {
          screenValue = screen.value + buttonText;
          screen.value = screenValue;
          isSign = true;
        }
        screen.classList.remove("negative"); // Remove negative class
      }
    });
  }
  
  document.addEventListener("keydown", function (event) {
    // ... (same code as before)
  });
  
  window.onerror = function () {
    alert("PLEASE INPUT VALID EXPRESSION");
    screenValue = "";
    screen.value = screenValue;
    screen.classList.remove("negative"); // Remove negative class
    console.clear();
  };
  
  // ... (same code as before)
  
  function checkForBracketMulti() {
    // ... (same code as before)
  
    if (eval(screenValue) !== undefined) {
      screen.value = eval(screenValue);
      lastScreenValue = screenValue;
      screenValue = screen.value;
      if (parseFloat(screen.value) < 0) {
        screen.classList.add("negative");
      } else {
        screen.classList.remove("negative");
      }
      // ... (same code as before)
    }
    flag = 1;
  }
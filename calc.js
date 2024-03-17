const container = document.querySelector(".container");
const root = document.querySelector(":root");
const btnThemeSwitcher = document.getElementById("themeSwitcher");
const input = document.getElementById("input");
const buttons = document.querySelectorAll(".charKey");
const clear = document.getElementById("clear");
const btnResult = document.getElementById("equal");
const inputResult = document.getElementById("result");
const copyToClipboard = document.getElementById("copyToClipboard");

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

function calculate() {
  copyToClipboard.innerText = "Copy";
  copyToClipboard.classList.remove("success");

  inputResult.classList.add("error");
  inputResult.value = "ERROR";

  inputResult.value = eval(input.value);

  inputResult.classList.remove("error");
}

btnThemeSwitcher.addEventListener("click", function () {
  if (container.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    container.dataset.theme = "light";
  } 
  
  else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    container.dataset.theme = "dark";
  }
});

input.addEventListener("keydown", function (ev) {
  ev.preventDefault();

  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
  }

  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }

  if (ev.key === "Enter") {
    calculate();
  }
});

buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    input.value += btn.dataset.value;
  });
});

clear.addEventListener("click", function () {
  input.value = "";
  input.focus();
});

btnResult.addEventListener("click", calculate);

copyToClipboard.addEventListener("click", function () {
  if (copyToClipboard.innerText === "Copy") {
    copyToClipboard.innerText = "Copied";
    copyToClipboard.classList.add("success");

    navigator.clipboard.writeText(inputResult.value);

    return;
  }

  copyToClipboard.innerText = "Copy";
  copyToClipboard.classList.remove("success");
});

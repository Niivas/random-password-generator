'use strict';

const upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const passwordLength = document.getElementById("password-length");
const upperCaseCheck = document.getElementById("uppercase");
const lowerCaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateButton = document.getElementById("generate");
const resetButton = document.getElementById("reset");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

passwordLength.addEventListener("input", function(e) {
    
    if (e.target.value.startsWith(0)){
        alert("shouldn't contain leading zeroes!");
        passwordLength.value = "";
    }
    else if (e.target.value > 128) {
        alert("shouldn't be greater than 128 characters!");
        passwordLength.value = e.target.value.slice(0, 2);
    }
    else if (isNaN(e.target.value)) {
        alert("should be a number!");
        passwordLength.value = "";
    }
    else {
        passwordLength.value = e.target.value;
    }
    
});

generateButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (passwordLength.value === "") {
        alert("Please enter a password length!");
    }
    else if (upperCaseCheck.checked === false && lowerCaseCheck.checked === false && numbersCheck.checked === false && symbolsCheck.checked === false) {
        alert("Please select at least one character type!");
    }
    else {
        password.value = generatePassword();
        password2.value = generatePassword();
    }
});

function generatePassword() {
    let password = "";
    let passwordArray = [];
    let passwordLengthValue = parseInt(passwordLength.value);
    let checkedBoxes = (upperCaseCheck.checked? 1: 0) + (lowerCaseCheck.checked? 1: 0) + (numbersCheck.checked? 1: 0) + (symbolsCheck.checked? 1: 0);
    let lengthForEach = passwordLengthValue / checkedBoxes;
    let remainder = passwordLengthValue % checkedBoxes;

    for (let i = 0; i < lengthForEach; i++) {
        if (upperCaseCheck.checked) {
            passwordArray.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
        }
        if (lowerCaseCheck.checked) {
            passwordArray.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
        }
        if (numbersCheck.checked) {
            passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }
        if (symbolsCheck.checked) {
            passwordArray.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }

    if (remainder !== 0) {
        if (upperCaseCheck.checked) {
            passwordArray.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
        }
        if (lowerCaseCheck.checked) {
            passwordArray.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
        }
        if (numbersCheck.checked) {
            passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }
        if (symbolsCheck.checked) {
            passwordArray.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }
    passwordArray.sort(() => Math.random() - 0.5);
    password = passwordArray.join("");
    return password
}

resetButton.addEventListener("click", function(e) {
    e.preventDefault();
    password.value = "";
    password2.value = "";
    passwordLength.value = "";
});

password.addEventListener("click", function(e) {
    if (password.value !== "") {
        e.preventDefault();
        password.select();
        document.execCommand("copy");
        let passwordValue = password.value;
        password.value = "copied!";
        setTimeout(function() {
            password.value = passwordValue;
        }, 1000);
    }
});

password2.addEventListener("click", function(e) {
    if (password2.value !== "") {
        e.preventDefault();
        password2.select();
        document.execCommand("copy");
        let passwordValue = password2.value;
        password2.value = "copied!";
        setTimeout(function() {
            password2.value = passwordValue;
        }, 1000);
    }
});

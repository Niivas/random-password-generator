// Define an array of uppercase letters
const upperCase = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

// Define an array of lowercase letters
const lowerCase = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

// Define an array of numbers
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// Define an array of symbols
const symbols = [
  '~',
  '`',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '{',
  '[',
  '}',
  ']',
  ',',
  '|',
  ':',
  ';',
  '<',
  '>',
  '.',
  '?',
  '/'
]

// Get the password length input element
const passwordLength = document.getElementById('password-length')

// Get the uppercase checkbox element
const upperCaseCheck = document.getElementById('uppercase')

// Get the lowercase checkbox element
const lowerCaseCheck = document.getElementById('lowercase')

// Get the numbers checkbox element
const numbersCheck = document.getElementById('numbers')

// Get the symbols checkbox element
const symbolsCheck = document.getElementById('symbols')

// Get the generate button element
const generateButton = document.getElementById('generate')

// Get the reset button element
const resetButton = document.getElementById('reset')

// Get the password input element
const password = document.getElementById('password')

// Get the second password input element
const password2 = document.getElementById('password2')

// Initialize variables to track if passwords have been copied
let alreadyCopied1 = false
let alreadyCopied2 = false

// Event listener for password length input
passwordLength.addEventListener('input', function (e) {
  // Check if the input starts with 0
  if (e.target.value.startsWith(0)) {
    alert("shouldn't contain leading zeroes!")
    passwordLength.value = ''
  }
  // Check if the input is greater than 128
  else if (e.target.value > 128) {
    alert("shouldn't be greater than 128 characters!")
    passwordLength.value = e.target.value.slice(0, 2)
  }
  // Check if the input is not a number
  else if (isNaN(e.target.value)) {
    alert('should be a number!')
    passwordLength.value = ''
  }
  // Set the password length value
  else {
    passwordLength.value = e.target.value
  }
})

// Event listener for generate button click
generateButton.addEventListener('click', function (e) {
  e.preventDefault()
  // Check if password length is empty
  if (passwordLength.value === '') {
    alert('Please enter a password length!')
  }
  // Check if no character type is selected
  else if (
    upperCaseCheck.checked === false &&
    lowerCaseCheck.checked === false &&
    numbersCheck.checked === false &&
    symbolsCheck.checked === false
  ) {
    alert('Please select at least one character type!')
  }
  // Generate and display passwords
  else {
    password.value = generatePassword()
    password2.value = generatePassword()
    alreadyCopied1 = false
    alreadyCopied2 = false
  }
})

/**
 * Generates a random password based on the specified criteria.
 *
 * @returns {string} The generated password.
 */
function generatePassword () {
  let password = ''
  const passwordArray = []
  const passwordLengthValue = parseInt(passwordLength.value)
  const checkedBoxes =
    (upperCaseCheck.checked ? 1 : 0) +
    (lowerCaseCheck.checked ? 1 : 0) +
    (numbersCheck.checked ? 1 : 0) +
    (symbolsCheck.checked ? 1 : 0)
  const lengthForEach = Math.floor(passwordLengthValue / checkedBoxes)
  let remainder = passwordLengthValue % checkedBoxes

  // Generate characters for each character type
  for (let i = 0; i < lengthForEach; i++) {
    if (upperCaseCheck.checked) {
      passwordArray.push(
        upperCase[Math.floor(Math.random() * upperCase.length)]
      )
    }
    if (lowerCaseCheck.checked) {
      passwordArray.push(
        lowerCase[Math.floor(Math.random() * lowerCase.length)]
      )
    }
    if (numbersCheck.checked) {
      passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)])
    }
    if (symbolsCheck.checked) {
      passwordArray.push(symbols[Math.floor(Math.random() * symbols.length)])
    }
  }

  // Generate additional characters for remainder
  if (remainder !== 0) {
    if (upperCaseCheck.checked) {
      passwordArray.push(
        upperCase[Math.floor(Math.random() * upperCase.length)]
      )
      remainder--
    }
  }
  if (remainder !== 0) {
    if (lowerCaseCheck.checked) {
      passwordArray.push(
        lowerCase[Math.floor(Math.random() * lowerCase.length)]
      )
      remainder--
    }
  }
  if (remainder !== 0) {
    if (numbersCheck.checked) {
      passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)])
      remainder--
    }
  }
  if (remainder !== 0) {
    if (symbolsCheck.checked) {
      passwordArray.push(symbols[Math.floor(Math.random() * symbols.length)])
      remainder--
    }
  }

  // Shuffle the password array
  passwordArray.sort(() => Math.random() - 0.5)

  // Join the password array into a string
  password = passwordArray.join('')

  return password
}

// Event listener for reset button click
resetButton.addEventListener('click', function (e) {
  e.preventDefault()
  // Clear password fields and length input
  password.value = ''
  password2.value = ''
  passwordLength.value = ''
})

// Event listener for password input click
password.addEventListener('click', function (e) {
  if (password.value !== '' && alreadyCopied1 === false) {
    e.preventDefault()
    // Copy password to clipboard
    password.select()
    document.execCommand('copy')
    const passwordValue = password.value
    password.value = 'copied!'
    alreadyCopied1 = true
    // Reset password value after 1 second
    setTimeout(function () {
      password.value = passwordValue
    }, 1000)
  }
})

// Event listener for second password input click
password2.addEventListener('click', function (e) {
  if (password2.value !== '' && alreadyCopied2 === false) {
    e.preventDefault()
    // Copy password to clipboard
    password2.select()
    document.execCommand('copy')
    const passwordValue = password2.value
    password2.value = 'copied!'
    alreadyCopied2 = true
    // Reset password value after 1 second
    setTimeout(function () {
      password2.value = passwordValue
    }, 1000)
  }
})

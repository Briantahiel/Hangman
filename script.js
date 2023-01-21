/* A function that replaces a character in a string. */
String.prototype.replaceAt = function (index, character) {
  return (
    this.substring(0, index) +
    character +
    this.substring(index + character.length)
  );
};

let gameOverBtn = document.querySelector(".gameOver").style.display = "none";
document.querySelector(".container-keyboard").style.visibility = "hidden";
document.querySelector(".container-game").style.visibility = "visible";
let btn_letters = document.querySelectorAll(".keyboard button");

function showMessage(){
    document.querySelector(".message").style.visibility = "visible";
}

for (let i = 0; i < btn_letters.length; i++) {
  btn_letters[i].addEventListener("click", function () {
    btn_letters[i].disabled = false;
  });
}

// Here(*) only accept letters, no spaces, no special characters, no numbers, etc.
let newW = document.querySelector("#btn-addWord");
newW.addEventListener("keypress", function(event){
    let word = String.fromCharCode(event.charCode);
        if(/[^a-zA-Z]/.test(word)){
            event.preventDefault(); 
        }
  });
//

function clearValue(){
    newW = document.querySelector("#btn-addWord").value = "";
}
function addWord() {
 /* Converting the word to uppercase, removing accents and trimming the word. This can be omitted by what was done here(*) but not toUpperCase*/
  newW = document.querySelector("#btn-addWord").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  
  let hasSpaces = newW.includes(" ");
 
  if(newW == ""){
    alert("Please enter a word")
  }

  else if(newW.length > 18){
    alert("It exceeds the letter limit")
  }
  else if(hasSpaces == true){
    alert("Spaces are not accepted")
  }
  else if(!words.includes(newW)){
    words.push(newW);
    alert("The word was added correctly!");
    console.log(words);
  }
  else{
    alert("Repeated word")
  }
  clearValue();
}
let randomWord = "";
let words = ["JAVA", "JAVASCRIPT", "PYTHON"];
const btn = document.getElementById("startGame");
const btnEndGame = document.getElementById("");
btn.addEventListener("click", startGame);
let countFail = 0;
let countHit = 0;
for (let i = 0; i < btn_letters.length; i++) {
    btn_letters[i].addEventListener("click", function () {
      btn_letters[i].disabled = true;
    });
  }

function startGame() {
  btn.disabled = true;
  usedLetters = [];
  countFail = 1;
  countHit = 0;  
  document.querySelector(".message").style.visibility = "hidden";
  document.querySelector(".gameOver").style.display = "block";
  document.querySelector("#addWord-btn").style.display = "none";
  document.querySelector(".underscore").style.visibility = "visible";
  document.querySelector(".gameOver").style.visibility = "visible";
  document.querySelector(".addWord-container").style.visibility = "hidden";
  gameOverBtn = document.querySelector(".gameOver").disabled = false;
  document.getElementById("imagen").style.visibility = "visible";
  //document.querySelector(".usedLetters").style.visibility = "visible";
  document.querySelector(".usedLetters").innerHTML = "";
  document.querySelector(".container-keyboard").style.visibility = "visible";
  document.querySelector(".container-game").style.visibility = "visible";
  document.getElementById("imagen").src = `./images/part1.png`;
  document.querySelector(".underscore").innerHTML = "";
  const countWords = words.length;
  const randomValue = Math.floor(Math.random() * countWords);
  randomWord = words[randomValue];
  underscore = randomWord.replace(/./g, "_ ");
  document.querySelector(".underscore").innerHTML = underscore;
}

function clickOnLetter(e) {
  let btn = e.target;
  const letter = btn.innerHTML;
  let ifGuessed = false;
  for (let i in randomWord) {
    document.querySelector(".underscore").innerHTML = underscore;
    if (letter == randomWord[i]) {
      underscore = underscore.replaceAt(i * 2, letter);
      countHit++;
      ifGuessed = true;
    }
  }
  if (ifGuessed == false) {
    countFail++;
    document.getElementById("imagen").src = `./images/part${countFail}.png`;
  }
  if (countFail == 8) {
    document.querySelector(".message").innerHTML =
      "You failed, the word was " + randomWord;
    showMessage();
    endGame();
  } else if (countHit == randomWord.length) {
    document.querySelector(".message").innerHTML = "Spot on! The word is " + randomWord;
    showMessage();
    endGame();
  }
  //usedLetters.push(letter);
  //let onlyOnes = [...new Set(usedLetters)];
  //document.querySelector(".usedLetters").innerHTML = onlyOnes;
}
function endGame() {
  document.querySelector(".gameOver").style.display = "none";
  document.querySelector("#addWord-btn").style.display = "block";
  document.querySelector(".usedLetters").style.visibility = "hidden";
  document.querySelector(".underscore").style.visibility = "hidden";
  gameOverBtn = document.querySelector(".gameOver").disabled = true;
  document.getElementById("imagen").style.visibility = "hidden";
  document.querySelector(".addWord-container").style.visibility = "visible";
  btn.disabled = false;
  document.querySelector(".container-keyboard").style.visibility = "hidden";
    for (let i = 0; i < btn_letters.length; i++) {
        btn_letters[i].disabled = false;
  }
}

function gameOver() {
  alert("Are you sure?");
  document.querySelector(".gameOver").style.display = "none";
  document.querySelector("#addWord-btn").style.display = "block";
  gameOverBtn = document.querySelector(".gameOver").disabled = true;
  document.querySelector(".addWord-container").style.visibility = "visible";
  document.getElementById("imagen").style.visibility = "hidden";
  document.querySelector(".underscore").style.visibility = "hidden";
  for (let i = 0; i < btn_letters.length; i++) {
    btn_letters[i].disabled = false;
  }
  countFail = 0;
  countHit = 0;
  btn.disabled = false;
  document.querySelector(".container-keyboard").style.visibility = "hidden";
  document.querySelector(".container-game").style.visibility = "hidden";
  document.querySelector(".usedLetters").style.visibility = "hidden";
}
for (let i = 0; i < btn_letters.length; i++) {
  btn_letters[i].addEventListener("click", clickOnLetter);
}


String.prototype.replaceAt = function (index, character) {
  return (
    this.substring(0, index) +
    character +
    this.substring(index + character.length)
  );
};

let gameOverBtn = document.querySelector(".gameOver").disabled = true;
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

function addWord() {
  let newW = document.querySelector("#btn-addWord").value.toUpperCase();
  if(newW == ""){
    alert("Please enter a new word")
  }
  else if(!words.includes(newW)){
    words.push(newW);
    alert("The word was added correctly!")
    console.log(words);
  }
  else{
    alert("Repeated word")
  }
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
  countFail = 0;
  countHit = 0;  
  document.querySelector(".message").style.visibility = "hidden";
  document.querySelector(".underscore").style.visibility = "visible";
  document.querySelector(".gameOver").style.visibility = "visible";
  document.querySelector(".addWord-container").style.visibility = "hidden";
  gameOverBtn = document.querySelector(".gameOver").disabled = false;
  document.getElementById("imagen").style.visibility = "visible";
  document.querySelector(".usedLetters").style.visibility = "visible";
  document.querySelector(".usedLetters").innerHTML = "";
  document.querySelector(".container-keyboard").style.visibility = "visible";
  document.querySelector(".container-game").style.visibility = "visible";
  document.getElementById("imagen").src = `./images/img00.png`;
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
    document.getElementById("imagen").src = `./images/img0${countFail}.png`;
  }
  if (countFail == 7) {
    document.querySelector(".message").innerHTML =
      "You failed, the word was " + randomWord;
    showMessage();
    endGame();
  } else if (countHit == randomWord.length) {
    document.querySelector(".message").innerHTML = "Spot on!";
    showMessage();
    endGame();
  }
  usedLetters.push(letter);
  let onlyOnes = [...new Set(usedLetters)];
  document.querySelector(".usedLetters").innerHTML = onlyOnes;
}
function endGame() {
  document.querySelector(".usedLetters").style.visibility = "hidden";
  document.querySelector(".underscore").style.visibility = "hidden";
  gameOverBtn = document.querySelector(".gameOver").disabled = true;
  document.getElementById("imagen").style.visibility = "hidden";
  btn.disabled = false;
  document.querySelector(".container-keyboard").style.visibility = "hidden";
    for (let i = 0; i < btn_letters.length; i++) {
        btn_letters[i].disabled = false;
  }
}

function gameOver() {
  alert("Are you sure?");
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


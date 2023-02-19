/* A function that replaces a character in a string. */
String.prototype.replaceAt = function (index, character) {
  return (
    this.substring(0, index) +
    character +
    this.substring(index + character.length)
  );
};

let gameOverBtn = document.querySelector(".gameOver").style.display = "none";
document.querySelector(".container-keyboard").style.display = "none";
document.querySelector(".container-game").style.visibility = "visible";
document.querySelector(".btn-help").style.display = "none";
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
    newH = document.querySelector("#btn-addHelp").value = "";
}

let randomWord = "";
let words = [
    { title: "JAVA", description: "Programming language. Its logo is a hot drink." },
    { title: "PYTHON", description: "Programming language. If it were real, it could bite you." },
    { title: "JAVASCRIPT", description: "Programming language. Fact, this game is made with this language." },
    { title: "BOOLEAN", description: "This help could be true or false, but not something else." },
    { title: "ITERATION", description: "The process of selecting these words at random is this action itself." },
    { title: "BUG", description: "It can cause a glitch or imperfection to any computer program." },
    { title: "PROGRAMMER", description: "Easypeasy. This is the person who writes or creates code among other actions." },
    { title: "LOOP", description: "A snippet of code that iterates until a condition is met." },
    { title: "CSS", description: "Style sheet language used to describe the presentation of a document written in a markup language."},
    { title: "HTML", description: "Markup language for creating web pages."},
];

function addWord() {
    /* Converting the word to uppercase, removing accents and trimming the word. This can be omitted by what was done here(*) but not toUpperCase*/
    let isDuplicated = false;
    newW = document.querySelector("#btn-addWord").value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    newH = document.querySelector("#btn-addHelp").value.normalize("NFD").trim();
    // let hasSpaces = newW.includes(" "); 

    if(newW == "" || newW.length > 12){
        alert("Please enter a word and no longer than 12 characters");
        return
    }
    for(let i = 0; i < words.length; i++){
        
        if(words[i].title.toUpperCase() == newW.toUpperCase()){
            alert("Repeated word. Choose another one");
            isDuplicated = true;
            break;
            } 
        }
        if(!isDuplicated && newW !== ""){
            words.push({title: newW, description: newH ? newH : "No description available"});
            alert("The word was added correctly!");  
        }
     clearValue(); 
}

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
  document.querySelector(".btn-start").style.display = "none";
  document.querySelector(".btn-help").style.display = "block";
  document.querySelector(".message").style.visibility = "hidden";
  document.querySelector(".gameOver").style.display = "block";
  document.querySelector("#addWord-btn").style.display = "none";
  document.querySelector(".underscore").style.visibility = "visible";
  document.querySelector(".gameOver").style.visibility = "visible";
  document.querySelector(".addWord-container").style.display = "none";
  document.querySelector(".addHelp-container").style.display = "none";
  document.getElementById("imagen").style.visibility = "visible";
  document.querySelector(".usedLetters").innerHTML = "";
  document.querySelector(".container-keyboard").style.display = "block";
  document.querySelector(".container-game").style.visibility = "visible";
  document.getElementById("imagen").src = `./images/part1.png`;
  document.querySelector(".underscore").innerHTML = "";
  gameOverBtn = document.querySelector(".gameOver").disabled = false;
  const countWords = words.length;
  const randomValue = Math.floor(Math.random() * countWords);
  randomWord = words[randomValue].title;
  description = words[randomValue].description;
  underscore = randomWord.replace(/./g, "_ ");
  document.querySelector(".underscore").innerHTML = underscore;
}

let help = document.querySelector("#getHelp");
let dialog = document.querySelector(".dialog");
let cancel = document.querySelector("#cancel");
help.addEventListener('click', () => dialog.showModal());
cancel.addEventListener('click', () => dialog.close());
function getHelp(){
  document.querySelector("#helpText").innerHTML = description;
  // alert(description)
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
  document.querySelector(".btn-start").style.display = "block";
  document.querySelector(".gameOver").style.display = "none";
  document.querySelector(".btn-help").style.display = "none";
  document.querySelector("#addWord-btn").style.display = "block";
  document.querySelector(".usedLetters").style.visibility = "hidden";
  document.querySelector(".underscore").style.visibility = "hidden";
  document.getElementById("imagen").style.visibility = "hidden";
  document.querySelector(".addWord-container").style.display = "block";
  document.querySelector(".addHelp-container").style.display = "block";
  btn.disabled = false;
  gameOverBtn = document.querySelector(".gameOver").disabled = true;
  document.querySelector(".container-keyboard").style.display = "none";
    for (let i = 0; i < btn_letters.length; i++) {
        btn_letters[i].disabled = false;
  }
}

function gameOver() {
  alert("Are you sure?");
  document.querySelector(".btn-start").style.display = "block";
  document.querySelector(".btn-help").style.display = "none";
  document.querySelector(".gameOver").style.display = "none";
  document.querySelector("#addWord-btn").style.display = "block";
  document.querySelector(".addWord-container").style.display = "block";
  document.querySelector(".addHelp-container").style.display = "block";
  document.getElementById("imagen").style.visibility = "hidden";
  document.querySelector(".underscore").style.visibility = "hidden";
  gameOverBtn = document.querySelector(".gameOver").disabled = true;
  for (let i = 0; i < btn_letters.length; i++) {
    btn_letters[i].disabled = false;
  }
  countFail = 0;
  countHit = 0;
  btn.disabled = false;
  document.querySelector(".container-keyboard").style.display = "none";
  document.querySelector(".container-game").style.visibility = "hidden";
  document.querySelector(".usedLetters").style.visibility = "hidden";
}
for (let i = 0; i < btn_letters.length; i++) {
  btn_letters[i].addEventListener("click", clickOnLetter);
}


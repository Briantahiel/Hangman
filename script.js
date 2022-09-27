String.prototype.replaceAt=function(index, character){
    return this.substring(0, index) + character + this.substring(index + character.length);}

function addWord(){
    let newW = document.querySelector("#btn-addWord").value;
    words.push(newW)
    console.log(words)
}
// let endGame = document.getElementById("finishGame").style.display = "none";
// let countRight = 0
// let countError = 0
// let btn_letters = document.querySelectorAll("#letters");
// document.querySelector(".container-keyboard").style.display = "none"
let randomWord = "";
let words = ["JAVA", "JAVASCRIPT", "PYTHON"];
const btn = document.getElementById("startGame");
btn.addEventListener('click', startGame);
let countFail = 0;
let countHit = 0;
let btn_letters = document.querySelectorAll("#letters");

function clickOnLetter(e){
    let btn = e.target;
    const letter = btn.innerHTML
    let ifGuessed = false;
    
    for(let i in randomWord){
        document.querySelector(".underscore").innerHTML = underscore;
        if(letter == randomWord[i]){
            underscore = underscore.replaceAt(i*2, letter); 
            countHit++
            ifGuessed = true
        }
    }
    if(ifGuessed == false){
        countFail++
        document.getElementById("imagen").src=`./images/img0${countFail}.png`;   
    }
    if(countFail == 7){
        document.querySelector(".underscore").innerHTML = "Perdiste, la palabra era " + randomWord;
        endGame()

    }
    else if(countHit == randomWord.length){
        document.querySelector(".underscore").innerHTML = "Ganaste";
        endGame()
    }
    usedLetters.push(letter)
    let onlyOnes = [...new Set(usedLetters)];
    document.querySelector(".usedLetters").innerHTML = onlyOnes
    console.log(onlyOnes)
}

function startGame(e){
    btn.disabled = true;
    document.querySelector(".usedLetters").style.display = "block";
    usedLetters = [];
    document.querySelector(".usedLetters").innerHTML = "";
    document.querySelector(".container-keyboard").style.display = "block"
    document.querySelector(".container-game").style.display = "block"
    document.getElementById("imagen").src=`./images/img00.png`
    countFail = 0;
    countHit = 0;
    document.querySelector(".underscore").innerHTML = "";
    const countWords = words.length;
    for(let i = 0; i < btn_letters.length; i++){  
        btn_letters[i].disabled = false
    }
    const randomValue = Math.floor(Math.random() * countWords);
    randomWord = words[randomValue];
    underscore = randomWord.replace(/./g, "_ ");
    document.querySelector(".underscore").innerHTML = underscore;   
}

function gameOver(){
    // alert("Estás seguro?");
    countFail = 0;
    countHit = 0;  
    btn.disabled = false
    document.querySelector(".container-keyboard").style.display = "none";
    document.querySelector(".container-game").style.display = "none";
}
for(let i = 0; i < btn_letters.length; i++){  
    btn_letters[i].addEventListener('click', clickOnLetter);
}
function endGame(){
    document.querySelector(".usedLetters").style.display = "none";
    for(let i = 0; i < btn_letters.length; i++){  
        btn_letters[i].disabled = true
    }
    btn.disabled = false
    document.querySelector(".container-keyboard").style.display = "none"
}
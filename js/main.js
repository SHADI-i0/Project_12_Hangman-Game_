const Letters = "abcdefghijklmnopqrstuvwxyz";
const LettersArray = Array.from(Letters);
let LettersContainer = document.querySelector(".letters");
LettersArray.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    LettersContainer.appendChild(span);
});

const words = {
    programming: ["php", "javascript", "go", "scala", "my sql", "python", "react", "Next js", "fortran", "C", "java", "node js", "express js", "mongodb", "Nest js", ],
    SocialMedia: ["Whats App", "Face book", "Instagram", "Telegram", "Messenger", "Linked In", "YouTube", "snapChat", ],
    names: ["AbdAlrahman", "Shadi", "Maya", "Louay", "abd allh", "Nehad", "Melad", "Mohammed", "Ahmed", ],
    countries: ["syria", "palestine", "yemen", "egypt", "bahrain", "Qatar", "lebanon", "ksa", "jordan", "Iraq", ],
};

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
document.querySelector(".category span").innerHTML = randomPropName; // + " , " + randomValueValue

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);
lettersAndSpace.forEach((letter) => {
    let span = document.createElement("span");
    if (letter === " ") {
        span.className = "with-space";
    }
    lettersGuessContainer.appendChild(span);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let winnerAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", function (e) {
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter == wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex == spanIndex) {
                        span.innerHTML = wordLetter;
                        winnerAttempts++;
                        if (winnerAttempts == theChosenWord.length) {
                            winner();
                        }else if (winnerAttempts == theChosenWord.length - 1 && theChosenWord.includes(" ")){
                            winner()
                        }
                    }
                });
            }
        });
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame();
                LettersContainer.classList.add("finished");
            }
        } else {
            document.getElementById("success").play();
        }
    }
});

function endGame() {
    let div = document.createElement("div");
    div.className = "popup";
    let divText = document.createTextNode(
        `Game Over , The Word Is ${randomValueValue}`
    );
    let p = document.createElement("p");
    p.className = "play-Again";
    let txtP = document.createTextNode("Play Again");
    p.appendChild(txtP);
    div.appendChild(divText);
    div.appendChild(p);
    document.body.appendChild(div);
    p.onclick = function () {
        window.location.reload();
    };
}

function winner() {
    LettersContainer.classList.add("finished");
    let div = document.createElement("div");
    div.className = "winner";
    let p = document.createElement("p");
    p.textContent = "congratulation !";
    let p2 = document.createElement("p");
    p2.textContent = `Number of incorrect attempts : ${wrongAttempts}`;
    let p3 = document.createElement("p");
    p3.className = "play-Again";
    let txtP = document.createTextNode("Play Again");
    p3.appendChild(txtP);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    document.body.appendChild(div);
    p3.onclick = function () {
        window.location.reload();
    };
}

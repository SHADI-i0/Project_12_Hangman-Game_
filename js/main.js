// Letters
const Letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
const LettersArray = Array.from(Letters);
// Select Letters Container
let LettersContainer = document.querySelector(".letters");
// Generate Letters
LettersArray.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    LettersContainer.appendChild(span);
});
// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "my sql", "python", "react", "Next js", "fortran", "C", "java", "node js", "express js", "mongodb", "Nest js", ],
    SocialMedia: ["Whats App", "Face book", "Instagram", "Telegram", "Messenger", "Linked In", "YouTube", "snapChat", ],
    names: ["AbdAlrahman", "Shadi", "Maya", "Louay", "abd allh", "Nehad", "Melad", "Mohammed", "Ahmed", ],
    countries: ["syria", "palestine", "yemen", "egypt", "bahrain", "Qatar", "lebanon", "ksa", "jordan", "Iraq", ],
};
// Get Random Property
let allKeys = Object.keys(words);
// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// Category words
let randomPropValue = words[randomPropName];
// Random Number Depend On words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The chosen Word
let randomValueValue = randomPropValue[randomValueNumber];
// set category Info
document.querySelector(".category span").innerHTML = randomPropName; // + " , " + randomValueValue

// select Letters Guess Container
let lettersGuessContainer = document.querySelector(".letters-guess");
// Convert Chosen Word To array
let lettersAndSpace = Array.from(randomValueValue);
// Create Spans Depend On word
lettersAndSpace.forEach((letter) => {
    //create empty span
    let span = document.createElement("span");
    // if letter is space
    if (letter === " ") {
        // Add Class To span
        span.className = "with-space";
    }
    //Append Spans To The Letters Guess Container
    lettersGuessContainer.appendChild(span);
});
// select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set Wrong Attempts
let wrongAttempts = 0;
let winnerAttempts = 0;

// select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On letters
document.addEventListener("click", function (e) {
    // set the chose status
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        //Get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter, wordIndex) => {
            // If the clicked letter equal To one of the chosen word letter
            if (theClickedLetter == wordLetter) {
                // Set status To correct
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex == spanIndex) {
                        span.innerHTML = wordLetter;
                        winnerAttempts++;
                        if (winnerAttempts == theChosenWord.length) {
                            winner();
                        }
                    }
                });
            }
        });
        // If Letter Is Wrong
        if (theStatus !== true) {
            // Increase The Wrong Attempts
            wrongAttempts++;
            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            // play Fail Sound
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
// End Game Function
function endGame() {
    // Create Popup Div
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
// winner Function
function winner() {
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
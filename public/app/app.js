//// activate the Game: -------------------------------------- //
const startBtn = document.getElementById("startBtn");
const TicTacToe = document.querySelector("[Tic-Tac-Toe]");

startBtn.onclick =  (e) =>{
    startBtn.classList.remove("activeGame");
    TicTacToe.classList.add("activeGame");
    e.stopPropagation();
};

// document.onclick =  outerCanceler;
 
// ------------------------------------------------------------- //
//// Check if DB player:
let playerID = sessionStorage.getItem("playerID") || null; 
console.log(playerID);
// ------------------------------------------------------------- //
//// Score;
const XSCORE = document.getElementById("x-score"); 
const OSCORE = document.getElementById("o-score"); 
let Xscore = localStorage.getItem("Xscore")*1 || 0;
let Oscore = localStorage.getItem("Oscore")*1 || 0;
XSCORE.textContent = Xscore; 
OSCORE.textContent = Oscore; 

// ------------------------------------------------------------- //
//// append the X or O the col player:
let circleTurn;
const Row = document.querySelectorAll("[row]");
const Col = document.querySelectorAll("[col]");
const tempCircle = document.getElementById("O");
const tempEx = document.getElementById("X");
const restartBtn = document.getElementById("restart");
const result = document.getElementById("resultMsg");
const iconWinner = document.querySelector("[icon-winner]");
const resultTitle = document.getElementById("resultTitle");
let winningCombination = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3 ,6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
                        
Col.forEach(spot => {
    spot.addEventListener('click', (e)=>{
        const currentPlayer = circleTurn ? dispalyEx(spot) : dispalyCircle(spot);
        PvP(currentPlayer);
    }, { once:true });
});

function PvP(currentPlayer){
    if(isWin(currentPlayer)){
        endGame("🎊 winner 🎊");
        circleTurn ? dispalyEx(iconWinner) : dispalyCircle(iconWinner);
        score(circleTurn);
        console.log("winner is: ", circleTurn ? "X" : "O");  
    }else if(isTie()){
        endGame("✨ Tie..! ✨");
        dispalyCircle(iconWinner);
        dispalyEx(iconWinner);
    }else{
        swapTurns();
    };
}


function swapTurns() {
    circleTurn = !circleTurn;
};

function outerCanceler(e){
    if(!e.path.includes(TicTacToe)){
        TicTacToe.classList.remove("activeGame");
        startBtn.classList.add("activeGame");
    };
};

function cleanBoared(){
    document.location.reload();
    result.classList.remove("activeResult");
};

const dispalyCircle = (spot) => {
    const O = tempCircle.content.cloneNode(true).children[0];
    spot.appendChild(O);
    return O.classList[0];
};

const dispalyEx = (spot) => {
    const X = tempEx.content.cloneNode(true).children[0];
    spot.appendChild(X);
    return X.classList[0];
};

function isWin(currentPlayer){
    return winningCombination.some(combination => {
        return combination.every(index => {
            if(Col[index].hasChildNodes()){
                return Col[index].firstElementChild.classList.contains(currentPlayer);
            };
        });
    });
};

function isTie(){
    const O = tempCircle.content.cloneNode(true).children[0].classList[0];
    const X = tempEx.content.cloneNode(true).children[0].classList[0];
    return [...Col].every(spot =>{
        if(spot.hasChildNodes()){
            return spot.firstElementChild.classList.contains(O) || spot.firstElementChild.classList.contains(X);
        };
    });
}

function score(currentPlayer){
    currentPlayer ? Xscore += 1 : Oscore += 1;
    localStorage.setItem("Xscore", Xscore);
    localStorage.setItem("Oscore", Oscore);
    XSCORE.textContent = Xscore;
    OSCORE.textContent = Oscore; 
    playerID ? scoreDelevery(Xscore, Oscore) : null;
}

function endGame(message){
    // document.removeEventListener('click', outerCanceler);
    result.classList.add("activeResult");
    resultTitle.textContent = message;
    restartBtn.onclick =  cleanBoared;
    result.classList.contains("activeResult") ? setInterval(cleanBoared, 30000) : null;
};

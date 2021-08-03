const PLAYER_O = 'O'
const PLAYER_X = 'X'
let computerChoice,
  winner,
  turn = 0;
let COMPUTER = undefined;
let compTurns = new Set();
const STARTBTN = document.getElementById("startbtn")
const BOARD = document.getElementsByClassName("board")[0];
const TURN_INFO = document.getElementById("infoturn");
const H3 = TURN_INFO.childNodes[1];
const CELLS = Array.from(document.getElementsByTagName("td"));
STARTBTN.addEventListener('click', buildGame);

const WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function buildGame(){
    STARTBTN.style.display = "none";
    console.log(board)
    board.style.display = "block";
    TURN_INFO.style.display = "block";
    const choose = choosePlayer();
    startGame(choose);
}

function ComputerTurn(){
    let random = Math.floor(Math.random() * 9)
    if (CELLS[random].innerText) {
        ComputerTurn();
    } 
        CELLS[random].innerText = COMPUTER;
        turn++;
}

function startGame(player){
    console.log(player)
    H3.innerText = `NOW TURN: ${player}`;

    next(player);
}


function next(player) {
    for (let cell of CELLS) {
      cell.addEventListener("click", () => {
        if (cell.innerText) return;
        cell.innerText = player;
        turn++; 
        
        
        winner = checkForWinner(player); // check for a winner on each turn and if winner then disable board and show winner;
        
        if (!winner && turn === 9) { 
          H3.innerText = `A DRAW!`;
          CELLS.forEach((el) => {
              el.classList.add('')
          })
        }

        player === PLAYER_X ? (player = COMPUTER) : (player = PLAYER_X);
        computerChoiceCell = ComputerTurn(player);
        H3.innerText = `NOW TURN: ${player}`;
        next(player);
      });
    }
}

function choosePlayer(){
    let choose = prompt(" X or O ?", PLAYER_O).toUpperCase();
    if(choose === PLAYER_X) {
        COMPUTER = PLAYER_O;
        return choose 
    } else if ( choose === PLAYER_O) {
        COMPUTER = PLAYER_X;
        return choose;
    } else if (choose === "" || choose === null) {
        choosePlayer();
    }
    console.log("bad input \n default return player: X \n computer: O");
    COMPUTER = PLAYER_O;
    return PLAYER_X;
}

function resetGame(){
    buildGame();
}


function checkForWinner(player){
    for(let i=0; i < 8; i++){
        if (
          CELLS[WINNING_COMBOS[i][0]].innerText === player &&
          CELLS[WINNING_COMBOS[i][1]].innerText === player &&
          CELLS[WINNING_COMBOS[i][2]].innerText === player
        ){ 
            for(let j=0; j<3; j++){
                CELLS[WINNING_COMBOS[i][j]].className = "winner";
            }
            console.log(`${player} win!`);

            return true;
        } 
    }
}

function smth(){
    
} 
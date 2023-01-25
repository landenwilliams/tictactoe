//dom selectors & various variables
const playerOneInput = document.getElementById('player-one-name');
const playerTwoInput = document.getElementById('player-two-name');
const playerNamesButtons = document.getElementsByClassName('name-buttons');
const board = document.getElementById('board');
const playerNamesContainer = document.getElementById('playerNames');
const playerText = document.getElementById ('player');
const restartButton = document.getElementById('restartbutton');

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
const gameState = {
    playerOne: "",
    playerTwo: "",
    players: ['X', 'O'],
    board: ["", "", "", "", "", "", "", "", ""],
    
  }
let players = gameState.players.map(i => i);
let playerOne = players[0];
let playerTwo = players[1];
let currentPlayer = playerOne;
let spaces = gameState.board.map(i => i);
let roundWon = false;


//helper functions

const playerNameFunction = (container) => {

  for(let i = 0; i < playerNamesButtons.length; i++) {
    playerNamesButtons[i].addEventListener('click', (event) => {
        const container = document.getElementById('playerNames');
        const playerOneDisplay = document.createElement('h3');
        const playerTwoDisplay = document.createElement('h3');
        const isPlayer1 = event.target.innerText.includes('1');

        if(isPlayer1) {
            gameState.playerOne = playerOneInput.value;
            playerOneDisplay.innerText = `Player One is: ${playerOneInput.value}`;
            container.appendChild(playerOneDisplay);
            playerOneInput.value = '';
            playerOneInput.hidden = true;
            playerNamesButtons[0].style.visibility = 'hidden';
    
        } else {
            gameState.playerTwo= playerTwoInput.value;
            playerTwoDisplay.innerText = `Player Two is: ${playerTwoInput.value}`;
            container.appendChild(playerTwoDisplay);
            playerTwoDisplay.value = '';
            playerTwoInput.hidden = true;
            playerNamesButtons[1].style.visibility = 'hidden'
        }

        if (playerTwoInput.value == "") {
          gameState.playerTwo = `Computer`;
          playerTwoDisplay.innerText = `Player Two is: ${gameState.playerTwo}`;
        }
    });  
  }
}

const switchPlayer = () => {

  if(currentPlayer == playerOne){
    currentPlayer = playerTwo;
  }
  else {
    currentPlayer = playerOne;
  };
  playerText.innerText = `Player: ${currentPlayer}`;


}

const createSpace = (i) => {
 
  const box = document.createElement('div');
  box.className = "box";
  box.id = i++;
  board.appendChild(box);
  box.addEventListener('click', (event) => {
      clickFunction(currentPlayer, box);

    })
 
  restartButton.addEventListener('click', () => {
    restartGame(box, playerNamesContainer);
    
  });
};

const clickFunction = (currentPlayer, box) => {
  if(box.innerText === ""){
  box.innerText = `${currentPlayer}`;
  spaces[box.id] = currentPlayer;
  
  if(gameState.playerTwo === "Computer"){
    autoPlayer();
  }
    
  checkWinner();
  
  } 
}

const createGameboard = () => {
  for (let i = 0; i <= 8; i++) {
    createSpace(i);
  };
};

const checkWinner =() => {
  let roundWon = false;

  for(let i = 0; i < winConditions.length; i++){

      const condition = winConditions[i];
      const spaceA = spaces[condition[0]];
      const spaceB = spaces[condition[1]];
      const spaceC = spaces[condition[2]];

      if(spaceA == "" || spaceB == "" || spaceC == ""){
          continue;
      }
      if(spaceA == spaceB && spaceB == spaceC){
          roundWon = true;
          break;
      }
  }

  if(roundWon){
    playerText.innerText = `${currentPlayer} wins!`;
  } else if(!spaces.includes("")){
    playerText.innerText = `Draw!`;
  } else{
    switchPlayer();
  }
};

const checkWinnerForAuto =() => {
  
  for(let i = 0; i < winConditions.length; i++){

      const condition = winConditions[i];
      const spaceA = spaces[condition[0]];
      const spaceB = spaces[condition[1]];
      const spaceC = spaces[condition[2]];

      if(spaceA == "" || spaceB == "" || spaceC == ""){
          continue;
      }
      if(spaceA == spaceB && spaceB == spaceC){
          roundWon = true;
          break;
      }
  }

  if(roundWon){
    playerText.innerText = `${currentPlayer} wins!`;
  } else if(!spaces.includes("")){
    playerText.innerText = `Draw!`;
  } 
  
};

const autoPlayer = () => {
  const box = document.getElementsByClassName("box");
  checkWinnerForAuto();
  let randomAnswer = Math.floor(Math.random()*box.length);
  let randomBox = document.getElementById(randomAnswer);
  if (!roundWon) {
    if (randomBox.innerText === ""){
      switchPlayer();
      spaces[randomAnswer] = currentPlayer;
      randomBox.innerText = `${currentPlayer}`;

      
    } else {
      autoPlayer();
    }
  } else {
    return;
  }
  
};

const restartGame = (box) => {
  box.innerText = "";
  currentPlayer = playerOne;
  gameState.playerOne= "";
  gameState.playerTwo="";
  spaces = ["", "", "", "", "", "", "", "", ""];
  playerText.innerText = `Player: ${currentPlayer}`; 
  playerOneInput.hidden = false;
  playerTwoInput.hidden = false;
  playerNamesButtons[0].style.visibility = 'visible';
  playerNamesButtons[1].style.visibility = 'visible';
  const playerDisplay = document.getElementById('playerNames');
  playerDisplay.innerHTML = ``;
  roundWon = false;
};

// render game
playerNameFunction(playerNamesContainer);
createGameboard();




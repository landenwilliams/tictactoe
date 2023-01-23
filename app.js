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


//helper functions

const playerNameFunction = (container) => {

  for(let i = 0; i < playerNamesButtons.length; i++) {
    playerNamesButtons[i].addEventListener('click', (event) => {

        const playerOneDisplay = document.createElement('h3');
        const playerTwoDisplay = document.createElement('h3');
         
        console.log(playerOneDisplay);
        console.log(playerTwoDisplay);
        
        const isPlayer1 = event.target.innerText.includes('1');

        if(isPlayer1) {
            gameState.playerOne = playerOneInput.value;
            // console.log(gameState.playerOne);
            playerOneDisplay.innerText = `Player One is: ${playerOneInput.value}`;
            // console.log(playerOneDisplay.innerText)
            container.appendChild(playerOneDisplay);
            playerOneInput.value = '';
            playerOneInput.hidden = true;
            
        } else {
            gameState.playerTwo= playerTwoInput.value;
            console.log(gameState.playerTwo);
            playerTwoDisplay.innerText = `Player Two is: ${playerTwoInput.value}`;

            container.appendChild(playerTwoDisplay);
            playerTwoDisplay.value = '';
            playerTwoInput.hidden = true;

        }
        event.target.style.visibility = 'hidden';
        
    })
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
    restartGame(box);
  });
};

const clickFunction = (currentPlayer, box) => {
  box.innerText = `${currentPlayer}`;
  spaces[box.id] = currentPlayer;
  checkWinner();
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
}

const restartGame = (box) => {
  box.innerText = "";
  currentPlayer = playerOne;
  spaces = ["", "", "", "", "", "", "", "", ""];
  playerText.innerText = `Player: ${currentPlayer}`; 
  playerOneInput.hidden = false;

};


// render game
playerNameFunction(playerNamesContainer);
createGameboard();
console.log(gameState.playerOne);



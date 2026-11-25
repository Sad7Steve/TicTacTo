let bord = document.querySelector(".bord");
let boxes = Array.from(document.querySelectorAll(".bord td"));

boxes.forEach(function (element){
  element.addEventListener("click", gameManager);
});

let player = "x";

export let score = {
  "x" : 0,
  "o" : 0,
}

let matrix = [
  ["?", "?", "?"],
  ["?", "?", "?"],
  ["?", "?", "?"],
];


loadScore();

function gameManager(e) {
  let box = e.target;
  draw(box, player);
  setPlayerOnBord(box, player); 
  
  console.table(matrix);

  // check state of game
  let result = ticTacto(matrix, player);

  if(result === "x" || result === "o") {
    // set result in session storage
    setResult(result);
    // show result and winner
    winner(result);
    // reset game
    resetGame(3000);
    // load score
    loadScore();
  }

  if(result === "draw") {
    resetGame();
  }


  // switch to second player
  if(player === "x") {
    player = "o";
  } else if (player === "o") {
    player = "x";
  }

}


function draw(cell, player) {
  cell.textContent = player;
  cell.classList.add("selected");
  cell.setAttribute("data-player", player);
}

function setPlayerOnBord(cell, player) {

  let index = boxes.indexOf(cell);
  let row = Math.floor(index / 3);
  let col = index % 3;

  matrix[row][col] = player;
  
}


function ticTacto(matrix, player) {

  for(let i = 0; i < matrix.length; i++) {
    if(matrix[i][0] === matrix[i][1] && matrix[i][0] === matrix[i][2] && matrix[i][0] === player) {
      return player;
    }
    else if(matrix[0][i] === matrix[1][i] && matrix[0][i] === matrix[2][i] && matrix[0][i] === player) {
      return player;
    }
  }

  if(matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2] && matrix[0][0] === player) {
    return player;
  }
  else if(matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0] && matrix[0][2] === player) {
    return player;
  } else if(matrix.flat(2).every(cell => cell !== "?")) {
    return "draw";
  } else {
    return "?";
  }
  
}

function setResult(player) {
  score[player] = score[player] + 1;
}

function winner(player) {
  setTimeout( _ => alert(`The ${player} Win...`), 0);
}

function resetGame(time) {
  setTimeout(function () {
    player = "x";
    matrix = [
      ["?", "?", "?"],
      ["?", "?", "?"],
      ["?", "?", "?"],
    ];

    boxes.flat(2).forEach( box => {
      box.textContent = "";
      box.removeAttribute("data-player");
      box.classList.remove("selected");
    });
    
  }, time);
}

function loadScore() {
  let playerOne = document.querySelector(".player.one span:last-child");
  let playertwo = document.querySelector(".player.two span:last-child");

  playerOne.textContent = score["x"];
  playertwo.textContent = score["o"];
}

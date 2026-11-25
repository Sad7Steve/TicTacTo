import {score, resetGame} from "gameLogic"
let resetButton = document.querySelector(".resetAllGame button");

resetButton.onclick = function () {
  resetGame(0);
  score = {
    "x":0,
    "o":0,
  }
}

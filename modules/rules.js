const message = require("../locale.json");

class GameRules {
  static getResult(playerMove, computerMove) {
    const moves = process.argv.slice(2);
    const userChoice = moves[playerMove - 1];
    const computerChoice = moves.indexOf(computerMove);
    const length = moves.length;
    const half = Math.floor(length / 2);

    this.winners = new Map();
    this.losers = new Map();

    for (let i = 0; i < length; i++) {
      const currentMove = moves[i];
      const currentWinners = new Set();
      const currentLosers = new Set();

      for (let j = 1; j <= half; j++) {
        const winnerIndex = (i + j) % length;
        const loserIndex = (i - j + length) % length;

        currentWinners.add(moves[winnerIndex]);
        currentLosers.add(moves[loserIndex]);
      }

      this.winners.set(currentMove, currentWinners);
      this.losers.set(currentMove, currentLosers);
    }
    const playerWinners = this.winners.get(userChoice);
    const playerLosers = this.losers.get(userChoice);

    console.log(message.yourMove + userChoice + ', ' + message.computerMove + computerMove);
    if (playerWinners.has(computerMove)) {
      return console.log(message.youWin);
    } else if (playerLosers.has(computerMove)) {
      return console.log(message.youLose);
    } else {
      return console.log(message.itsDraw);
    }
  }
}

module.exports = GameRules;
const message = require("../locale.json");

class Validation {
  static checkArgv() {
    const moves = process.argv.slice(2);
    const allUnique = [...new Set(moves)];
    if (moves.length < 3) {
      console.log(message.notEnoughtOptions);
    } else if (moves.length % 2 == 0) {
      console.log(message.evenQuantity);
    } else if (moves.length !== allUnique.length) {
      console.log(message.notUnique);
    } else return true;
  }
}

module.exports = Validation;
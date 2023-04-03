const args = process.argv.slice(2);
const moves = args.length;
const message = require("../locale.json");

class Help {
  static help() {
    const table = new (require("cli-table3"))({
      head: [message.moves].concat(args),
      colWidths: [20].concat(Array(args.length).fill(10)),
      wordWrap: true,
    });

    for (let i = 0; i < moves; i++) {
      const row = [args[i]];
      for (let j = 0; j < moves; j++) {
        if (i === j) {
          row.push(message.resultDraw);
        } else if (
          (j > i && j - i <= moves / 2) ||
          (j < i && i - j > moves / 2)
        ) {
          row.push(message.resultWin);
        } else {
          row.push(message.resultLose);
        }
      }
      table.push(row);
    }

    console.log(table.toString());
  }
}

module.exports = Help;
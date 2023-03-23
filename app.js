const args = process.argv.slice(2);
const Crypto = require("./modules/crypto");
const Validation = require("./modules/validation");
const Help = require("./modules/help");
const readline = require("readline");
const GameRules = require("./modules/rules");

const app = () => {
  const isValid = Validation.checkArgv();
  const token = Crypto.generateKey();
  const computerChoice = args[Math.floor(Math.random() * args.length)];
  const hmac = Crypto.generateHMAC(token, computerChoice);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  isValid ? displayMenu() : process.exit();

  function displayMenu() {
    console.log("==== Rock-Paper-Scissors ====");
    console.log(`HMAC: ${hmac}`);
    args.map((arg, i) => {
      console.log(`${++i} - ${arg}`);
    });
    console.log("? - Help");
    console.log("0 - Exit");
    rl.question("Your choice: ", (choice) => {
      if (choice === "0") {
        console.log("Goodbye!");
        rl.close();
      } else if (choice === "?") {
        displayHelp();
      } else if (
        choice === "1" ||
        choice === "2" ||
        choice === "3" ||
        choice === "4" ||
        choice === "5" ||
        choice === "6" ||
        choice === "7"
      ) {
        playGame(parseInt(choice), computerChoice, token);
      } else {
        displayMenu();
      }
    });
  }

  function displayHelp() {
    Help.help();
    displayMenu();
  }

  function playGame(userChoice, computerChoice, token) {
    GameRules.getResult(userChoice, computerChoice);
    console.log(`HMAC key: ${token}`);
    process.exit();
  }
};

app();
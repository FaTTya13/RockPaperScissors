const moveOptions = process.argv.slice(2);
const Crypto = require("./modules/crypto");
const Validation = require("./modules/validation");
const Help = require("./modules/help");
const readline = require("readline");
const GameRules = require("./modules/rules");
const message = require("./locale.json");

const app = () => {
  const isValid = Validation.checkArgv();
  const token = Crypto.generateKey();
  const computerChoice = moveOptions[Math.floor(Math.random() * moveOptions.length)];
  const hmac = Crypto.generateHMAC(token, computerChoice);
  const helpMenu = '?';
  const exitGame = '0';
  const minOptionsQty = 1;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  isValid ? displayMenu() : process.exit();

  function displayMenu() {
    console.log(message.gameTitle + '\n' + message.hmac + hmac);
    moveOptions.map((option, i) => {
      console.log(`${++i} - ${option}`);
    });
    console.log(helpMenu + ' - ' + message.help + '\n' + exitGame + ' - ' + message.exit);
    rl.question(message.playerChoice, (playerChoice) => {
      if (playerChoice === exitGame) {
        console.log(message.goodbye);
        rl.close();
      } else if (playerChoice === helpMenu) {
        displayHelp();
      } else if (
        minOptionsQty >= playerChoice <= moveOptions.length
      ) {
        playGame(parseInt(playerChoice), computerChoice, token);
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
    console.log(`${message.hmacKey} ${token}`);
    process.exit();
  }
};

app();
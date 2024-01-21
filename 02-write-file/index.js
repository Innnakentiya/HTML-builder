const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptText = 'Hi! Enter whatever you want :';
let isFirstInput = true;

function writeFile() {
  rl.question(promptText, (inputText) => {
    if (inputText.toLowerCase() === 'exit') {
      rl.close();
    } else {
      fs.writeFile(filePath, inputText, (err) => {
        if (err) {
          console.error('An error has occurred :', err);
        } else {
          console.log(`The text was successfully written into ${filePath}`);
          addMore();
        }
      });
    }
  });
}

function addMore() {
  isFirstInput = false;
  rl.question('', (inputText) => {
    if (inputText.toLocaleLowerCase() === 'exit') {
      rl.close();
    } else {
      fs.appendFile(filePath, `\n\n${inputText}`, (err) => {
        if (err) {
          console.error('An error has occurred :', err);
        } else {
          console.log(
            `The text gas been successfully appended into ${filePath}`,
          );
          addMore();
        }
      });
    }
  });
}

writeFile();

function handleExit() {
  console.log('Buy!');
  process.exit();
}

rl.on('close', handleExit);
rl.on('SIGINT', handleExit);

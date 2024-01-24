const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptText = 'Hi! Enter whatever you want: ';

function writeFile() {
  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.error('An error has occurred while creating the file:', err);
      rl.close();
    } else {
      console.log(`File ${filePath} has been created.`);
      addText();
    }
  });
}

function addText() {
  rl.question(promptText, (inputText) => {
    if (inputText.toLowerCase() === 'exit') {
      rl.close();
    } else {
      fs.appendFile(filePath, `${inputText}\n\n`, (err) => {
        if (err) {
          console.error(
            'An error has occurred while writing to the file:',
            err,
          );
          rl.close();
        } else {
          console.log(`The text has been successfully added to ${filePath}`);
          addText();
        }
      });
    }
  });
}

writeFile();

function handleExit() {
  console.log('Bye!');
  process.exit();
}

rl.on('close', handleExit);
rl.on('SIGINT', handleExit);

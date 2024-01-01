const readline = require("readline");

class CommandLine {
  //Static methods are always called directly on the class without creating an instance/object of the class.
  static ask(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      rl.question(`${question} `, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }

  static print(text) {
    console.log(text);
  }
}

module.exports = { CommandLine };

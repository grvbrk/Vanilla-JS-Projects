const Account = require("./Account");
const { CommandLine } = require("./CommandLine");

async function main() {
  const accountName = await CommandLine.ask(
    "Which account do you want to access?"
  );
  const account = await Account.find(accountName);
  if (account) {
    console.log("Found Account");
  } else {
    promptCreateAccount(accountName);
  }

  async function promptCreateAccount(accountName) {
    const response = await CommandLine.ask(
      "Do you want to create a new Account? (yes/no)"
    ).toString();
    if (response === "yes") {
      return Account.create(accountName);
    }
  }
}

main();

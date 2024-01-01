const Account = require("./Account");
const { CommandLine } = require("./CommandLine");

async function main() {
  const accountName = await CommandLine.ask(
    "Which account do you want to access?"
  );
  let account = await Account.find(accountName);
  if (!account) account = await promptCreateAccount(accountName);
  if (account) {
    await promptTask(account);
  }

  async function promptCreateAccount(accountName) {
    const response = await CommandLine.ask(
      "Account does not exits. Do you want to create a new account instead? (yes/no)"
    );
    if (response === "yes") {
      return await Account.create(accountName);
    }
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    "What would you like to do with your balance? (view/deposit/withdraw)"
  );

  if (response.toLowerCase() === "view")
    CommandLine.print(`Your account balance is ${account.balance}`);

  if (response.toLowerCase() === "deposit") {
    const amount = await CommandLine.ask("Amount to be deposited?");
    account.deposit(amount);
    CommandLine.print(
      `Success! Your account balance is now ${account.balance}`
    );
  }

  if (response.toLowerCase() === "withdraw") {
    const amount = await CommandLine.ask("Amount to be withdrawn?");
    try {
      await account.withdraw(amount);
    } catch (error) {
      CommandLine.print(
        `Not enough balance. Account balance : ${account.balance}`
      );
    }
  }
}

main();

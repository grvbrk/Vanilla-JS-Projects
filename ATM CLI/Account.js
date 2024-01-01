const fs = require("fs");
const FileSystem = require("./FileSystem");

module.exports = class Account {
  constructor(name) {
    this.#name = name;
  }

  //Private variable must be declared outside other function's scope
  #name;
  #balance;

  //We make getter function for private properties
  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }

  get filePath() {
    return `accounts/${this.#name}.txt`;
  }

  deposit(amount) {
    const newBalance = this.#balance + Number(amount);
    FileSystem.write(this.filePath, newBalance);
    this.#balance = newBalance;
  }

  async withdraw(amount) {
    const newBalance = this.#balance - Number(amount);
    return new Promise((resolve, reject) => {
      if (newBalance < 0) {
        reject("Not enough balance");
      } else {
        FileSystem.write(this.filePath, newBalance);
        this.#balance = newBalance;
        resolve();
      }
    });
  }

  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath));
  }

  // We create a new account for the given account name
  // If account.load() returns this account, we return the account
  // If account.load() returns null, there's no account
  static async find(accountName) {
    const account = new Account(accountName);

    try {
      await account.#load();
      return account;
    } catch (error) {
      return;
    }
  }

  static async create(accountName) {
    const account = new Account(accountName);

    //We do not load this account since there's no file.
    // Hence we create a file/account
    try {
      await FileSystem.write(account.filePath, 0);
      account.#balance = 0;
      return account;
    } catch (error) {
      return null;
    }
  }
};

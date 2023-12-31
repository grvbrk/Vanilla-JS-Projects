const fs = require("fs");
const FileSystem = require("./FileSystem");

module.exports = class Account {
  constructor(name) {
    this.#name = name;
  }

  //Private variable must be declared outside other function's scope
  #name;
  #balance;

  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }

  get filePath() {
    return `accounts/${this.#name}.txt`;
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
  }
};

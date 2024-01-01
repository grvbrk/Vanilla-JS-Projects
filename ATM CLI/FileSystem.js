const fs = require("fs");

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static write(path, value) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, value.toString(), "utf-8", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
};

const path = require('path')
const fs = require('fs')

module.exports = {
  getData: fileName => {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, `api/${fileName}.json`);
      fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data))
        }
      });
    })
  }
}


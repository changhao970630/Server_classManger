//connect to the dateBase

const mongoose = require('mongoose');

const DB_URL = 'localhost:27017';

const DB_NAME = 'user';

let connectUserPromise = new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`,{ useNewUrlParser: true, useUnifiedTopology: true  });
    mongoose.connection.on("open", err => {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    })
})
module.exports = connectUserPromise

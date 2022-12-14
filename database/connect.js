const mongoose = require('mongoose');
const config = require(`${__dirname}/../config/config`);
// const autoIncrement = require('mongoose-auto-increment')

// Set up mongoose connection
const mongoDB = process.env.MONGO_URL || config.db.mongodb_url
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("Connected to the database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to the database!", err);
//         process.exit();
//     });
mongoose.Promise = global.Promise
const mongodb = mongoose.connection

//  autoIncrement = require('mongoose-auto-increment')
// autoIncrement.initialize(mongodb)

// CONNECTION EVENTS
// When successfully connected
mongodb.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.db.db_name)
})
// If the connection throws an error
mongodb.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err)
})
// When the connection is disconnected
mongodb.on('disconnected', function (err) {
    console.log('err', err);
    console.log('Mongoose default connection disconnected')
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongodb.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})
module.exports = {
    mongodb,
}

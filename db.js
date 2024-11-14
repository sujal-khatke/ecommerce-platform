const { concat } = require("lodash");
const mongoose = require('mongoose')

//Define yhe mongodb connection url
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ecommerce-database",
    serverSelectionTimeoutMS: 30000,
})
    .then(() => console.log("Connected to MongoDB server"))
    .catch(err => console.error("Mongodb connection error:", err));

// Access the mongoose connection object
const db = mongoose.connection;

//Define Event listeners for database connection

db.on('connected', () => {
    console.log("Connected to Mongodb server");
})
db.on('error', () => {
    console.error("Mongodb connection error");
})
db.on('disconnected', () => {
    console.log("Mongodb disconnected");
})

// Export the database connection 
module.exports = db;
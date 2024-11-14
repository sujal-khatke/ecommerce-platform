require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db')
const morgan = require('morgan')
const mongoose = require('mongoose')

const api = process.env.API_URL

const bodyParser = require('body-parser')

//middleware
app.use(bodyParser.json()); //req.body
app.use(morgan('tiny'));

app.get('/', function (req, res) {
    res.send("Welcome to the E-Commerce Platform");
});


//Import the router files
const product = require('./routes/product')
const auth = require('./routes/auth')
const cart = require('./routes/cart')
const order = require('./routes/order');

//Use the router
app.use('/',product);
app.use('/auth',auth)
app.use('/cart', cart);
app.use('/', order);   

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running http://localhost:3000");
});
const { min } = require('lodash');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name:{
            type: String,
            required : [true, 'Product name is required'],
            validate:{
                validator: function(value){
                    return /^[A-Za-z\s]+$/.test(value);
                },
                message: 'Name is only contain alphabets'
            }
        },
        description:{
            type: String,
            required : [true, 'Product description is required'],
            validate:{
                validator: function(value){
                    return /^[A-Za-z0-9\s]+$/.test(value);
                },
                message: 'Description is only contain alphabets'
            }
        },
        price:{
            type: Number,
            required: [true, 'Product pric is required'],
            min: [0,'Price must be a positive number']
        },
        category:{
             type: String,
             required: [true, 'Product category is required']
        }
    });
//Create product model
const Product = mongoose.model('Product',productSchema);
module.exports = Product;    
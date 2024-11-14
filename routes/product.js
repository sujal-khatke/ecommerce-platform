const express = require('express');
const router = express.Router();
const Product = require('./../models/product');

//post route to add product
router.post('/addproduct', async (req, res) => {
    try {
        const data = req.body //assuming request .body contains product data

        //create new product document using mongoose model
        const newProduct = new Product(data);

        //save the new product to the database
          const response = await newProduct.save()
          console.log('Product is added successfully.');
          res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }

});

// Get method to get products
router.get('/products', async(req, res)=>{
try {
    const data = await Product.find();
    console.log('Product is get successfully.');
          res.status(200).json(data);
} catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'})
}
});

// Put method to Update product
router.put('/updateproduct/:productId', async(req, res)=> {
    try {
        const productId = req.params.productId; //Extarct the id from url parameter
        const updateproductData = req.body;

        const response = await Product.findByIdAndUpdate(productId, updateproductData, {
            new: true, //return the update ddocument
            runValidators: true, //Run mongoose validator
        })

        if(!response){
            return res.status(404).json({error: 'Product not found'});
        }

        console.log('Product is updated successfully');
        res.status(200).json(response);
      
    } catch (error) {   
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
});

router.delete('/deleteproduct/:productId', async(req,res)=>{
    try {
        const productId = req.params.productId; //Extarct the id from url parameter
        
        const response = await Product.findByIdAndDelete(productId);

        if(!response){
            return res.status(404).json({error: 'Product not found'});
        }

        console.log('Product is deleted successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

module.exports = router;
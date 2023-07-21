var express = require('express');
var router = express.Router();

const Product = require('../../src/models/product.model');
const { checkProductId } = require('../../src/helpers/middlewares');


router.get('/', async (req, res) => {

    try {
        const products = await Product.find().populate('comprador');
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message});
    }

});

router.get('/:productId',checkProductId,async (req,res) => {
    const {productId} = req.params;

    try {
        const product = await Product.findById(productId);
        res.json(product);

    }catch(error){
        res.json({fatal:error.message});
    }
});

router.post('/', async (req,res) => {

    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error){
        res.json({fatal:error.message});
    }
    
});

router.put('/:productId',checkProductId, async (req,res)=> {

    const {productId} = req.params;

    try {
        
        const updatedProduct = await Product.findByIdAndUpdate(productId,req.body);
        res.json(updatedProduct);

    } catch(error) {
        res.json ({fatal:error.message});
    }
    
});

router.delete('/:productId',checkProductId, async (req,res)=> {

    const {productId} = req.params;

    try {
        
        const deleteProduct = await Product.findByIdAndDelete(productId);
        res.json(deleteProduct);

    } catch(error) {
        res.json ({fatal:error.message});
    }
    
});

module.exports = router;
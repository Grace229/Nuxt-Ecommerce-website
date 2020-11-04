const router = require('express').Router();
const Product = require('../models/product')
const upload = require("../middlewares/upload-photos")

// title: String,
// description: String,
// photo: String,
// price: Number,
// stockQuantity: Number,
// rating: [Number]
// POST Request-- create a new product
router.post("/products", upload.single('photo'), async (req, res) => {
    try {
        let product = new Product();
        product.ownerID = req.body.ownerID;
        product.categoryID = req.body.categoryID;
        product.price = req.body.price;
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();

        res.json({
            status: true,
            message: 'successfully save'
        });

    }catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});


// GET Request-- get all products
router.get('/products', async (req, res) => {
    try{
        let products =  await Product.find();
        res.json({
        products : products
        })
    }catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
    
});

// GET Request-- get a product
router.get('/products/:id', async (req, res) => {
    try{
        let product =  await Product.findOne({ _id: req.params.id})
        .populate('owner category')
        .exec();

        res.json({
            product : product
        })
    }catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
    
});

// PUT Request-- update a single products
router.put('/products/:id', upload.single('photo'), async (req, res) => {
    try{
        let product =  await Product.findOneAndUpdate(
            { _id: req.params.id }, 
            {
            $set: {
               title : req.body.title,
               price : req.body.price,
               category : req.body.categoryID,
               photo : req.file.location,
               description : req.body.description,
               owner : req.body.ownerID 
            }
        },
        { upsert: true }
        );

        res.json({
        success : true,
        updateProduct: product

        })
    }catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
    
});


// DELETE  Request-- Delete a single products   
router.delete('/products/:id', async (req, res) => {
    try {
        let deletedproduct =  await Product.findOneAndDelete({ _id: req.params.id}); 
        if (deletedproduct){
            res.json({
                status : true,
                message : "successfully deleted"
            });
        }
  
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;
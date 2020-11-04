const router = require('express').Router();
const Category = require('../models/category');


// POST
router.post("/categories", async (req, res) => {
    try{
        let category = new Category
        category.type = req.body.type
        await category.save();

        res.json({
            status : true,
            message : "succesfully created a category"
        })

    }catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

// GET
router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find();

        res.json({
           categories : categories
        });
    } catch (err) {
        res.status(500).json({
            status : false,
            message : err.message
        });
    }
});

module.exports = router;
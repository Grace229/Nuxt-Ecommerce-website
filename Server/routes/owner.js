const router = require('express').Router();
const Owner= require('../models/owner')
const upload = require("../middlewares/upload-photos")


router.post("/owners", upload.single("photo"), async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;
       
        await owner.save();

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


// GET Request-- get all owners
 router.get('/owners', async (req, res) => {
     try{
        let owners = await Owner.find();

        res.json({
            owners : owners
        });
     }catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
 })

// GET Request-- get a product

// PUT Request-- update a single products

// DELETE  Request-- Delete a single products   

module.exports = router;
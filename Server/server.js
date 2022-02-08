const express = require("express");
const morgan = require("morgan"); 
const bodyparser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const PORT = 8000;
dotenv.config();

const app = express();

mongoose.connect(
  process.env.DATABASE,
     { useNewUrlParser: true, useUnifiedTopology: true},
    err =>{
        if (err) {
            console.log(err);
        }else{
            console.log("Database connected");
        }
    }
)
// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// GET - retrieve data from the server
app.get('/', (req, res) => {
    res.json("hello Amazon clone");
});
// POST - send data from the client to the server
// app.post('/', (req, res) =>{
//     let user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//    user.save((err) =>{
//        if (err){
//            console.log(err);
//        }else{
//            console.log("user added succesfully");
//        }
//    })
// })
// require apis
const productRoutes = require('./routes/product');
const ownerRoutes = require('./routes/owner');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/auth');
app.use('/api', productRoutes);
app.use('/api', ownerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);

app.listen(PORT, err => {
    if (err){
        console.log(err);
    }else{
        console.log(`Listening on port ${PORT}`);
    }
});


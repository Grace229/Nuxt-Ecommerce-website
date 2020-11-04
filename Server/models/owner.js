const mongoose = require('mongoose');
const Schema = mongoose.Schema;

OwnerSchema = new Schema({
    name: String,
    about: String,
    photo: String
});

module.exports = mongoose.model("Owner", OwnerSchema);
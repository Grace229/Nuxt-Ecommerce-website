const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CategorySchema = new Schema({
    type: { type: String, unique: true, required: true}
});

module.exports = mongoose.model("Category", CategorySchema);
const mongoose = require('mongoose');

// Define the room schema
const newsSchema = new mongoose.Schema({
    code : { type: String, required: true, index: true},
    headline: { type: String, required: true, index: true},
    image: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, required: true},
    author: { type: String, required: true}

});

const News = mongoose.model('news', newsSchema);
module.exports = News;
// Bring in the DB connection and the News schema
const Mongoose = require('./db');
const News = require('./news');

// Read seed data from json file
var fs = require('fs');
var news = JSON.parse(fs.readFileSync('./data/news.json','utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await News.deleteMany({});
    await News.insertMany(news);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
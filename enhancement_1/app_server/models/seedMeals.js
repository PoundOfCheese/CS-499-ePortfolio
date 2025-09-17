// Bring in the DB connection and the Meal schema
const Mongoose = require('./db');
const Meal = require('./meals');

// Read seed data from json file
var fs = require('fs');
var meals = JSON.parse(fs.readFileSync('./data/mealList.json','utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Meal.deleteMany({});
    await Meal.insertMany(meals);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
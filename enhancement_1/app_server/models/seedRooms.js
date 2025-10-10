// Bring in the DB connection and the Meal schema
const Mongoose = require('./db');
const Room = require('./rooms');

// Read seed data from json file
var fs = require('fs');
var rooms = JSON.parse(fs.readFileSync('./data/roomList.json','utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Room.deleteMany({});
    await Room.insertMany(rooms);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
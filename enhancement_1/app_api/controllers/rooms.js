const mongoose = require('mongoose');
const Room = require('../models/rooms'); // Register model
const Model = mongoose.model('rooms');

// GET: /rooms - lists all the rooms
// Regardless of outcome, reqponse must include HTML status code
// and JSON message to the requesting client
const roomsList = async(req, res) => {
    try {
        const q = await Model
            .find({}) // No filter, return all records
            .exec();

        // Uncomment the following line to shoe results of query
        // on the console
        // console.log(q);

        if(!q) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "Rooms not found" });
        } else { // Return resulting room list
            return res
                .status(200)
                .json(q);
        }
    } catch(err) {
        return res
            .status(500)
            .json({ error: err.message });
    }
    
};

const roomsFindByCode = async(req, res) => {
    try {
        const q = await Model
            .findOne({'code' : req.params.roomCode}) // Return single record
            .exec();

        // Uncomment the following line to shoe results of query
        // on the console
        // console.log(q);

        if(!q) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "Room not found"});
        } else { // Return resulting room list
            return res
                .status(200)
                .json(q);
        }
    } catch(err) {
        return res
            .status(500)
            .json({ error: err.message });
    }
    
};

// POST: /rooms - Adds a new room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsAddRoom = async(req, res) => {
    const newRoom = new Room({
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        rate: req.body.rate,
        description: req.body.description
    });

    try {
        const q = await newRoom.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json({ message: "Unable to add room"});
        } else { // Return new room
            return res
                .status(201)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: err.mesage });
    }
    
        
        // Uncomment the following line to show results of operation
        // on the console
        // console.log(q);
};

// PUT: /rooms/:roomCode - Updates an existing room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsUpdateRoom = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code' : req.params.roomCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    image: req.body.image,
                    rate: req.body.rate,
                    description: req.body.description
                }
            )
            .exec();

        if(!q)
        {
            //Database returned no data
            return res
                .status(400)
                .json({ message: "Room not found" });
        } else {
            // Return resulting updated room
            return res
                .status(201)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: err.message });
    }
    

        // Uncomment the following line to show results of operation
        // on the console
        // console.log(q);
};

// DELETE: /rooms/:roomCode - Deletes an existing room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsDeleteRooom = async(req, res) => {
    try {
        const q = await Model
            .findOneAndDelete(
                { 'code' : req.params.roomCode }
            )
            .exec();

        if(!q)
        {
            // Database retured no data
            return res
                .status(400)
                .json({ message: "Room not found" });
        } else {
            // Return resulting deleted room
            return res
                .status(200)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: err.message });
    }
    
}

module.exports = {
    roomsList,
    roomsFindByCode,
    roomsAddRoom,
    roomsUpdateRoom,
    roomsDeleteRooom
};
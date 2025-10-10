const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, reqponse must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
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
                .json({ message: "Trips not found" });
        } else { // Return resulting trip list
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

const tripsFindByCode = async(req, res) => {
    try {
        const q = await Model
            .findOne({'code' : req.params.tripCode}) // Return single record
            .exec();

        // Uncomment the following line to shoe results of query
        // on the console
        // console.log(q);

        if(!q) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "Trip not found"});
        } else { // Return resulting trip list
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

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const q = await newTrip.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json({ message: "Unable to add trip"});
        } else { // Return new trip
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

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code' : req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            )
            .exec();

        if(!q)
        {
            //Database returned no data
            return res
                .status(400)
                .json({ message: "Trip not found" });
        } else {
            // Return resulting updated trip
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

// DELETE: /trips/:tripCode - Deletes an existing trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsDeleteTrip = async(req, res) => {
    try {
        const q = await Model
            .findOneAndDelete(
                { 'code' : req.params.tripCode }
            )
            .exec();

        if(!q)
        {
            // Database retured no data
            return res
                .status(400)
                .json({ message: "Trip not found" });
        } else {
            // Return resulting deleted trip
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
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
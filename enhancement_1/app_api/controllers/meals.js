const mongoose = require('mongoose');
const Meal = require('../models/meals'); // Register model
const Model = mongoose.model('meals');

// GET: /meals - lists all the meals
// Regardless of outcome, reqponse must include HTML status code
// and JSON message to the requesting client
const mealsList = async(req, res) => {
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
                .json({ message: "Meals not found" });
        } else { // Return resulting meal list
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

const mealsFindByCode = async(req, res) => {
    try {
        const q = await Model
            .findOne({'code' : req.params.mealCode}) // Return single record
            .exec();

        // Uncomment the following line to shoe results of query
        // on the console
        // console.log(q);

        if(!q) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "Meal not found"});
        } else { // Return resulting meal list
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

// POST: /meals - Adds a new meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsAddMeal = async(req, res) => {
    const newMeal = new Meal({
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        name_detail: req.body.name_detail,
        description: req.body.description
    });

    try {
        const q = await newMeal.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json({ message: "Unable to add meal"});
        } else { // Return new meal
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

// PUT: /meals/:mealCode - Updates an existing meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsUpdateMeal = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code' : req.params.mealCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    image: req.body.image,
                    name_detail: req.body.name_detail,
                    description: req.body.description
                }
            )
            .exec();

        if(!q)
        {
            //Database returned no data
            return res
                .status(400)
                .json({ message: "meal not found" });
        } else {
            // Return resulting updated meal
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

// DELETE: /meals/:mealCode - Deletes an existing meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsDeleteMeal = async(req, res) => {
    try {
        const q = await Model
            .findOneAndDelete(
                { 'code' : req.params.mealCode }
            )
            .exec();

        if(!q)
        {
            // Database retured no data
            return res
                .status(400)
                .json({ message: "Meal not found" });
        } else {
            // Return resulting deleted meal
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
    mealsList,
    mealsFindByCode,
    mealsAddMeal,
    mealsUpdateMeal,
    mealsDeleteMeal
};
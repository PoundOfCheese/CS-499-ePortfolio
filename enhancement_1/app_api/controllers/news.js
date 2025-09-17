const mongoose = require('mongoose');
const News = require('../models/news'); // Register model
const Model = mongoose.model('news');

// GET: /news - lists all the news
// Regardless of outcome, reqponse must include HTML status code
// and JSON message to the requesting client
const newsList = async(req, res) => {
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
                .json({ message: "news not found" });
        } else { // Return resulting news list
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

const newsFindByCode = async(req, res) => {
    try {
        const q = await Model
            .findOne({'code' : req.params.newsCode}) // Return single record
            .exec();

        // Uncomment the following line to shoe results of query
        // on the console
        // console.log(q);

        if(!q) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "news not found"});
        } else { // Return resulting news list
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

// POST: /news - Adds a new news
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsAddNews = async(req, res) => {
    const newNews = new News({
        code: req.body.code,
        headline: req.body.headline,
        image: req.body.image,
        description: req.body.description,
        date: req.body.date,
        author: req.body.author
    });

    try {
        const q = await newNews.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json({ message: "Unable to add news"});
        } else { // Return new news
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

// PUT: /news/:newsCode - Updates an existing news
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsUpdateNews = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code' : req.params.newsCode },
                {
                    code: req.body.code,
                    headline: req.body.headline,
                    image: req.body.image,
                    description: req.body.description,
                    date: req.body.date,
                    author: req.body.author
                }
            )
            .exec();

        if(!q)
        {
            //Database returned no data
            return res
                .status(400)
                .json({ message: "news not found" });
        } else {
            // Return resulting updated news
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

// DELETE: /news/:newsCode - Deletes an existing news
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsDeleteNews = async(req, res) => {
    try {
        const q = await Model
            .findOneAndDelete(
                { 'code' : req.params.newsCode }
            )
            .exec();

        if(!q)
        {
            // Database retured no data
            return res
                .status(400)
                .json({ message: "News not found" });
        } else {
            // Return resulting deleted news
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
    newsList,
    newsFindByCode,
    newsAddNews,
    newsUpdateNews,
    newsDeleteNews
};
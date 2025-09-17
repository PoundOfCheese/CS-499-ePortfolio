const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require("../controllers/trips");
const mealsController = require("../controllers/meals");
const roomsController = require("../controllers/rooms");
const newsController = require("../controllers/news");
const authController = require("../controllers/authentication");

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if (token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth param to the decoded object
    });
    next(); // We need to continue or this will hang forever
}

// define route for register endpoint
router.route("/register").post(authController.register);

// define route for login endpoint
router.route("/login").post(authController.login);

// define route for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList)                             // GET Method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip);       // POST Method adds a trip



// define route for our trips/:tripcode endpoint
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)                       // Get Method routes tripsFindByCode - requires parameter
    .put(authenticateJWT, tripsController.tripsUpdateTrip)      // PUT Method routes tripsUpdateTrip - requires parameter
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);  // DELETE Method routes tripsDeleteTrip - requires parameter

// define route for our meals endpoint
router
    .route("/meals")
    .get(mealsController.mealsList)                             // GET Method routes mealList
    .post(authenticateJWT, mealsController.mealsAddMeal);       // POST Method adds a meal


// define route for our meals/:mealcode endpoint
router
    .route('/meals/:mealCode')
    .get(mealsController.mealsFindByCode)                       // GET Method routes mealsFindByCode - requries parameter
    .put(authenticateJWT, mealsController.mealsUpdateMeal)      // PUT Method routes mealsUpdateMeal - requires parameter
    .delete(authenticateJWT, mealsController.mealsDeleteMeal);  // DELETE Method routes mealsDeleteMeal - requires parameter

// define route for our rooms endpoint
router
    .route("/rooms")
    .get(roomsController.roomsList)                             // GET Method routes roomList
    .post(authenticateJWT, roomsController.roomsAddRoom);       // POST Method adds a room

// define route for our rooms/:roomcode endpoint
router
    .route("/rooms/:roomCode")
    .get(roomsController.roomsFindByCode)                       // GET Method routes roomsFindByCode - requires parameter
    .put(authenticateJWT, roomsController.roomsUpdateRoom)      // PUT Method routes roomsUpdateRoom - requires parameter
    .delete(authenticateJWT, roomsController.roomsDeleteRooom); // DELETE Method routes roomsDeleteRoom - requires parameter

// define route for our news endpoint
router
    .route("/news")
    .get(newsController.newsList)                               // GET Method routes newsList
    .post(authenticateJWT, newsController.newsAddNews);         // POST Method adds a news

// define route for our news/:newsCode endpoint
router
    .route("/news/:newsCode")
    .get(newsController.newsFindByCode)                         // GET Method routes newsFindByCode - requires parameter
    .put(authenticateJWT, newsController.newsUpdateNews)        // PUT Method routes newsUpdateNews - requires parameter
    .delete(authenticateJWT, newsController.newsDeleteNews);    // DELETE Method routes newsDeleteNews - requires parameter

module.exports = router;
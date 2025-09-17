const mealsEndpoint = 'http://localhost:3000/api/meals';
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
};

/*var fs = require('fs');
var mealList = JSON.parse(fs.readFileSync('./data/mealList.json', 'utf8'));

const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Getaways', mealList});
};*/

/* GET meals view */
const meals = async function(req, res, next) {
    // console.log('MEALS CONTROLLER BEGIN');
    await fetch(mealsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No meals exist in our database!';
                }
            }
            res.render('meals', { title: 'Travlr Getaways', mealList: json});
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    meals
};
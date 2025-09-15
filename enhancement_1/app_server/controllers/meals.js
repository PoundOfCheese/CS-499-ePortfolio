var fs = require('fs');
var mealList = JSON.parse(fs.readFileSync('./data/mealList.json', 'utf8'));

/* GET travel view */
const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Getaways', mealList});
};

module.exports = {
    meals
};
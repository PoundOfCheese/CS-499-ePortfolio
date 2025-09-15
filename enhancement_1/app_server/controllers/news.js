var fs = require('fs');
var newsList = JSON.parse(fs.readFileSync('./data/newsList.json', 'utf8'));

/* GET travel view */
const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaways', newsList});
};

module.exports = {
    news
};
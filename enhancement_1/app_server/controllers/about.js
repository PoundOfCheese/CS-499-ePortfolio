var fs = require('fs');
var adList = JSON.parse(fs.readFileSync('./data/adList.json', 'utf8'));

/* GET about view */
const about = (req, res) => {
    res.render('about', { title: 'Travlr Getaways', adList});
};

module.exports = {
    about
};
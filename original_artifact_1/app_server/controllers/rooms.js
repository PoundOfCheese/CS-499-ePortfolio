var fs = require('fs');
var roomList = JSON.parse(fs.readFileSync('./data/roomList.json', 'utf8'));

/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways', roomList});
};

module.exports = {
    rooms
};
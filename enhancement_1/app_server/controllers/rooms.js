const roomsEndpoint = 'http://localhost:3000/api/rooms';
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
};

/*var fs = require('fs');
var roomList = JSON.parse(fs.readFileSync('./data/roomList.json', 'utf8'));

const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways', roomList});
};*/

/* GET rooms view */
const rooms = async function(req, res, next) {
    // console.log('ROOMS CONTROLLER BEGIN');
    await fetch(roomsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No rooms exist in our database!';
                }
            }
            res.render('rooms', { title: 'Travlr Getaways', roomList: json});
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    rooms
};
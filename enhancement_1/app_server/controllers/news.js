const newsEndpoint = 'http://localhost:3000/api/news';
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
};

/*var fs = require('fs');
var newsList = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));

const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaways', newsList});
};*/

/* GET news view */
const news = async function(req, res, next) {
    // console.log('NEWS CONTROLLER BEGIN');
    await fetch(newsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No news exist in our database!';
                }
            }
            res.render('news', { title: 'Travlr Getaways', newsList: json});
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    news
};
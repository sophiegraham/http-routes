const Tweets = require('../models/Tweets');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const tweet = Tweets.get(id);
        res.send(tweet);
    } else {
        const tweets = Tweets.getAll();
        res.send(tweets);
    }
};

const post = (req, res) => {
    const { username, text } = req.body;
    const tweet = Tweets.create(username, text);
    res.send(tweet);
};

const drop = (req, res) => {
    Tweets.drop();
    res.send('tweets removed');
};

const put = (req, res) => {
    const { id } = req.body;
    const tweet = Tweets.update(id, req.body);
    res.send(tweet);

};

const remove = (req, res) => {
    const { id } = req;
    Tweets.delete(id);
    res.send('deleted');
};

const methods = {
    get,
    post,
    drop,
    put,  
    delete: remove 
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

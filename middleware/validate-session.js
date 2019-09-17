const jwt = require('jsonwebtoken');
const Client = require('../db').import('../models/client');

module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded) {
            Client.findOne({
                where: {id: decoded.id}
            }, console.log(decoded)
            ) 
            .then(client => {
                if(!client) throw 'err'
                req.client = client
                return next();
            })
            .catch(err => next(err))
        } else {
            req.errors = err;
            return res.status(500).send('Not authorized')
        }
    })
}
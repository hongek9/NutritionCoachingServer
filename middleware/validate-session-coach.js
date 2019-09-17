const jwt = require('jsonwebtoken');
const Coach = require('../db').import('../models/coach');

module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded) {
            Coach.findOne({
                where: {id: decoded.id}
            }, console.log(decoded)
            ) 
            .then(coach => {
                if(!coach) throw 'err'
                req.coach = coach
                return next();
            })
            .catch(err => next(err))
        } else {
            req.errors = err;
            return res.status(500).send('Not authorized')
        }
    })
}
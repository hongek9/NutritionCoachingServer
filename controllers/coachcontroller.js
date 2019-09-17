const router = require('express').Router();
const Coach = require('../db').import('../models/coach');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session')

/************************************
 * SIGN UP
 ***********************************/
router.post('/signup', (req,res) => {
    Coach.create({
        firstName: req.body.coach.firstName,
        lastName: req.body.coach.lastName,
        email: req.body.coach.email,
        username: req.body.coach.username,
        password: bcrypt.hashSync(req.body.coach.password, 10),
    })
    .then(
        createSuccess = (coach) => {
            let token = jwt.sign({ id: coach.id},process.env.JWT_SECRET,{expiresIn: 60*60*24})
            res.json({
                coach: coach,
                message: 'coach was created',
                sessionToken: token
            })
        },
        createError = (err) => res.send(500,err)
    )
})

/************************************
 * SIGN IN
 ***********************************/
router.post('/signin', (req,res) => {
    Coach.findOne({
        where : {
            username: req.body.coach.username
        }
    })
    .then(coach => {
        if(coach) {
            bcrypt.compare(req.body.coach.password, coach.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: coach.id}, process.env.JWT_SECRET,{expiresIn: 60*60*24})
                    res.json({
                        coach: coach,
                        message: 'sucessfuly authenticated user',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'bad gateway'})
                }
            })
        } else {
            res.status(500).send({error: 'failed to authenticate'})
        }
    },
    err => res.status(501).send({error: 'failed to process'}))
    
})

/************************************
 * GET ALL COACHES
 ***********************************/
router.get('/', (req,res) => {
    Coach.findAll()
    .then(coach => res.status(200).json(coach))
    .catch(err => res.status(500).json({
        error: err
    }));
})

module.exports = router;
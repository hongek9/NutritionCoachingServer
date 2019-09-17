const router = require('express').Router();
const Client = require('../db').import('../models/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');
const validateSessionCoach = require('../middleware/validate-session-coach');
/************************************
 * SIGN UP
 ***********************************/
router.post('/signup', (req,res) => {
    Client.create({
        firstName: req.body.client.firstName,
        lastName: req.body.client.lastName,
        email: req.body.client.email,
        username: req.body.client.username,
        password: bcrypt.hashSync(req.body.client.password, 10),
        primaryGoal: req.body.client.primaryGoal,
        coach: req.body.client.coach
    })
    .then(
        createSuccess = (client) => {
            let token = jwt.sign({ id: client.id},process.env.JWT_SECRET,{expiresIn: 60*60*24})
            res.json({
                client: client,
                message: 'client was created',
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
    Client.findOne({
        where : {
            username: req.body.client.username
        }
    })
    .then(client => {
        if(client) {
            bcrypt.compare(req.body.client.password, client.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: client.id}, process.env.JWT_SECRET,{expiresIn: 60*60*24})
                    res.json({
                        client: client,
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

router.put('/:id', validateSession, (req,res) => {
    // console.log(req.user);
    Client.update(req.body.client,{
        where: {id: req.params.id}
    })
    .then(client => res.status(200).json({message: "update complete"}))
    .catch(err => res.json({message: err}))
})

/************************************
 * GET ALL CLIENTS FOR SPECFIC COACH
 ***********************************/
router.get('/', validateSessionCoach, (req,res) => {
    Client.findAll({
        where: {coach: req.coach.id}
    })
    .then(coach => res.status(200).json(coach))
    .catch(err => res.status(500).json({
        error: err
    }));
})

/************************************
 * GET ONE CLIENT FOR SPECFIC COACH
 ***********************************/
router.get('/:id', validateSessionCoach, (req,res) => {
    Client.findAll({
        where: {id: req.params.id, coach: req.coach.id}
    })
    .then(coach => res.status(200).json(coach))
    .catch(err => res.status(500).json({
        error: err
    }));
})



module.exports = router;
const router = require('express').Router();
const Message = require('../db').import('../models/message');
const validateSession = require('../middleware/validate-session');
const validateSessionCoach = require('../middleware/validate-session-coach');

/********************************
 * GET all messages (client)
 ********************************/
router.get('/', validateSession, (req,res) => {
    Message.findAll({
        where: {owner: req.client.id}
    })
    .then(message => res.status(200).json(message))
    .catch(err => res.status(500).json({
        error: err
    }));
})

/*********************************
 * POST message (client)
 ********************************/
router.post('/', validateSession, (req,res) => {
    // console.log(req.client);
    const messageRequest = {
        overview: req.body.message.overview,
        owner: req.client.id,
        coach: req.client.coach
    }
    Message.create(messageRequest)
        .then(message => res.status(200).json(message))
        .catch(err => res.json({error: err}));
})

/********************************
 * GET messages (coach)
 ********************************/
router.get('/:id', validateSessionCoach, (req,res) => {
    Message.findAll({
        where: {owner: req.params.id, coach: req.coach.id}
    })
    .then(message => res.status(200).json(message))
    .catch(err => res.status(500).json({
        error: err
    }));
});

/*********************************
 * POST message (coach)
 ********************************/
router.post('/:id', validateSessionCoach, (req,res) => {
    // console.log(req.client);
    const messageRequest = {
        overview: req.body.message.overview,
        owner: req.params.id,
        coach: req.coach.id
    }
    Message.create(messageRequest)
        .then(message => res.status(200).json(message))
        .catch(err => res.json({error: err}));
})





module.exports = router;
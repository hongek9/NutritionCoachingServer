const router = require('express').Router();
const Macros = require('../db').import('../models/macros');
const validateSession = require('../middleware/validate-session');
const validateSessionCoach = require('../middleware/validate-session-coach');

/********************************
 * GET macros (client)
 ********************************/
router.get('/', validateSession, (req,res) => {
    Macros.findAll({
        where: {owner: req.client.id}
    })
    .then(macros => res.status(200).json(macros))
    .catch(err => res.status(500).json({
        error: err
    }));
})


/********************************
 * GET macros (coach)
 ********************************/
router.get('/:id', validateSessionCoach, (req,res) => {
    Macros.findAll({
        where: {owner: req.params.id, coach: req.coach.id}
    })
    .then(macros => res.status(200).json(macros))
    .catch(err => res.status(500).json({
        error: err
    }));
});

/*********************************
 * POST macros (coach)
 ********************************/
router.post('/:id', validateSessionCoach, (req,res) => {
    // console.log(req.client);
    const macrosRequest = {
        protein: req.body.macros.protein,
        carbs: req.body.macros.carbs,
        fat: req.body.macros.fat,
        owner: req.params.id,
        coach: req.coach.id
    }
    Macros.create(macrosRequest)
        .then(macros => res.status(200).json(macros))
        .catch(err => res.json({error: err}));
})

/*********************************
 * PUT macros (coach)
 ********************************/
router.put('/:id', validateSessionCoach, (req,res) => {
    // console.log(req.client);
    Macros.update(req.body.macros,{
        where:{owner: req.params.id, coach: req.coach.id}
    })
        .then(macros => res.status(200).json(macros))
        .catch(err => res.json({error: err}));
})

/*********************************
 * DELE macros (coach)
 ********************************/
router.delete('/:id', validateSessionCoach, (req,res) => {
    // console.log(req.client);
    Macros.destroy({
        where:{owner: req.params.id, coach: req.coach.id}
    })
        .then(macros => res.status(200).json(macros))
        .catch(err => res.json({error: err}));
})





module.exports = router;
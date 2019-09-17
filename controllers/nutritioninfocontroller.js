const router = require('express').Router();
const NutritionInfo = require('../db').import('../models/nutritionInfo');
const validateSession = require('../middleware/validate-session');
const validateSessionCoach = require('../middleware/validate-session-coach');

/********************************
 * GET all of the nutrition info (client)
 ********************************/
router.get('/', validateSession, (req,res) => {
    NutritionInfo.findAll({
        where: {owner: req.client.id}
    })
    .then(nutritioninfo => res.status(200).json(nutritioninfo))
    .catch(err => res.status(500).json({
        error: err
    }));
})

/*********************************
 * POST nutrition info (client)
 ********************************/
router.post('/', validateSession, (req,res) => {
    // console.log(req.client);
    const nutritionInfoRequest = {
        protein: req.body.nutrition.protein,
        fat: req.body.nutrition.fat,
        carbs: req.body.nutrition.carbs,
        weight: req.body.nutrition.weight,
        comment: req.body.nutrition.comment,
        owner: req.client.id,
        coach: req.client.coach
    }
    NutritionInfo.create(nutritionInfoRequest)
        .then(nutritioninfo => res.status(200).json(nutritioninfo))
        .catch(err => res.json({error: err}));
})

/**************************************
 * PUT update nutrition info (client)
 *************************************/
router.put('/:id', validateSession, (req, res) => {
    NutritionInfo.update(req.body.nutrition, {
        where: {id: req.params.id, owner: req.client.id}
    })
    .then(nutritioninfo => res.send(200).json(nutritioninfo))
    .catch(err => res.json({error: err}))
})

/********************************
 * GET all of the nutrition info (coach)
 ********************************/
router.get('/:id', validateSessionCoach, (req,res) => {
    NutritionInfo.findAll({
        where: {owner: req.params.id, coach: req.coach.id}
    })
    .then(nutritioninfo => res.status(200).json(nutritioninfo))
    .catch(err => res.status(500).json({
        error: err
    }));
});

/**************************************
 * PUT update nutrition info (coach)
 *************************************/
router.post('/:id', validateSessionCoach, (req,res) => {
    // console.log(req.client);
    const nutritionInfoRequest = {
        protein: req.body.nutrition.protein,
        fat: req.body.nutrition.fat,
        carbs: req.body.nutrition.carbs,
        weight: req.body.nutrition.weight,
        comments: req.body.nutrition.comments,
        owner: req.params.id,
        coach: req.coach.id
    }
    NutritionInfo.create(nutritionInfoRequest)
        .then(nutritioninfo => res.status(200).json(nutritioninfo))
        .catch(err => res.json({error: err}));
})





module.exports = router;
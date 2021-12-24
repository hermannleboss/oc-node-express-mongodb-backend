const express = require ('express');
const router = express.Router();
const Thing = require('../models/Things');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Object saved'}))
        .catch(error => res.status(400).json({error}));

});
router.put('/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({message: 'Object Updated'}))
        .catch(error => res.status(400).json({error}));
});
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Object Deleted'}))
        .catch(error => res.status(400).json({error}));
});
router.get('/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
});
router.get('/', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));

});

module.exports = router;
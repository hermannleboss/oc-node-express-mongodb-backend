const Thing = require('../models/Things');
exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Object saved'}))
        .catch(error => res.status(400).json({error}));

}
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({message: 'Object Updated'}))
        .catch(error => res.status(400).json({error}));
}

exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (!thing) {
                return res.status(404).json({
                    error: new Error('Object not found')
                });
            }
            if (thing.userId != req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Request not authorized')
                });
            }
            Thing.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Object Deleted'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));
}
exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
}
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
}
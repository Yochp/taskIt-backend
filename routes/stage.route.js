const router = require('express').Router();
const Stage = require('../db').Stage;

function createItem(req) {
    return {
        // TODO create new Stage
    };
}

// get all the data where the app up, not sure this is necessary
router.route('/')
    .get((req, res, next) => {
        Stage.find({}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    })

// get all Stages
router.route('/Stages')
    .get((req, res, next) => {
        Stage.find({}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    })



router.route('/Stages/:id')
    .get((req, res, next) => {
        const idReq = parseInt(req.params.id);
        Stage.find({_id: idReq}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    })


    .put((req, res, next) => {
        const idReq = parseInt(req.params.id);
        if (idReq && !isNaN(idReq)) {
            Stage.findOneAndUpdate({_id: idReq}, req.body)
                .then(
                    () => Stage.findOne({_id: idReq}).then((StageUpdate) => {
                        res.json(StageUpdate)
                    })
                )
        } else {
            const err = Error('fail to update the item');
            next(err);
        }
    })

    .post((req, res, next) => {
        const idReq = parseInt(req.params.id);
        const item = createItem(req);
        if (idReq && !isNaN(idReq)) {
            let data = new Stage(item);
            data.save();
        } else {
            const err = Error('fail to insert new item');
            next(err);
        }
    })

    .delete((req, res, next) => {
        const idReq = parseInt(req.params.id);
        if (idReq && !isNaN(idReq)) {
            Stage.findOneAndRemove({_id: idReq})
                .then(
                    () => Stage.findOne({_id: idReq}).then((StageDeleted) => {
                        res.send(StageDeleted)
                    })
                )
        } else {
            const err = Error('fail to delete the item');
            next(err);
        }
    });

module.exports = router;
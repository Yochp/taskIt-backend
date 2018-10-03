const router = require('express').Router();
const Task = require('../db').Task;
const Stage = require('../db').Stage;

function createItem(req) {
    return {

        id: req.body.id,
        name: req.body.name,
        owner: req.body.owner,
        admin: req.body.admin,
        description: req.body.description,
        // notes: [{content: req.body.content, author: req.body.author}],
        stageId: req.body.stageId,
        modified: req.body.modified,
        created: req.body.created,
        code: req.body.code,
    };
}

// get all the data where the app up, not sure this is necessary
router.route('/')
    .get((req, res, next) => {
        Task.find({}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    })

// get all tasks
router.route('/tasks')
    .get((req, res, next) => {
        Task.find({}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    })


router.route('/tasks/:id')
    .get((req, res, next) => {
        const idReq = parseInt(req.params.id);
        Task.find({id: idReq}, (err, data) => { /** need to change to _id**/
            if (err) return next(err);
            res.json(data);
        });
    })


    .put((req, res, next) => {
        const idReq = parseInt(req.params.id);
        if (idReq && !isNaN(idReq)) {
            Task.findOneAndUpdate({id: idReq}, req.body) /** need to change to _id**/
                .then(
                    () => Task.findOne({id: idReq}).then((taskUpdate) => {
                        /** need to change to _id**/
                        res.json(taskUpdate)
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
            let data = new Task(item);
            data.save();
        } else {
            const err = Error('fail to insert new item');
            next(err);
        }
    })

    .delete((req, res, next) => {
        const idReq = parseInt(req.params.id);
        if (idReq && !isNaN(idReq)) {
            Task.findOneAndRemove({id: idReq}) /** need to change to _id**/
                .then(
                    () => Task.findOne({id: idReq}).then((taskDeleted) => {
                        /** need to change to _id**/
                        res.send(taskDeleted)
                    })
                )
        } else {
            const err = Error('fail to delete the item');
            next(err);
        }
    });

module.exports = router;
const router = require('express').Router();
const Task = require('../db').Task;
const Stage = require('../db').Stage;

function createItem(req) {
    return {
    // TODO create new task
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
        Task.find({_id: idReq}, (err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    })


    .put((req, res, next) => {
        const idReq = parseInt(req.params.id);
        if (idReq && !isNaN(idReq)) {
            Task.findOneAndUpdate({_id: idReq}, req.body)
                .then(
                    () => Task.findOne({_id: idReq}).then((taskUpdate) => {
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
            Task.findOneAndRemove({_id: idReq})
                .then(
                    () => Task.findOne({_id: idReq}).then((taskDeleted) => {
                        res.send(taskDeleted)
                    })
                )
        } else {
            const err = Error('fail to delete the item');
            next(err);
        }
    });

module.exports = router;
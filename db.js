const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskit', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected to taskit db in mongoDB');
});

const TaskSchema = mongoose.Schema({
    name: String,
    created: Date,
    admin: String,
    notes: [{content: String, author: String}],
    stageId: String,
    code: Number,
    owner: String

});

const StageSchema = mongoose.Schema({
    name: String,
    tasksId: [{tasksId: String}],
    index: Number,
});

const Task = mongoose.model('Task', TaskSchema);
const Stage = mongoose.model('Stage', StageSchema);


module.exports = {
    Stage: Stage,
    Task: Task,
};

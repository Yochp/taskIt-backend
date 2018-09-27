// const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());

const taskRouter = require('./routes/task.route');
const stageRouter = require('./routes/stage.route');


// app.use(express.static('/static'));
app.use('/api', taskRouter);
app.use('/api', stageRouter);



//
// // config tha files for build it from index.html ----------------------------------------------
// const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg',];
//
// app.get('*', (req, res) => {
//     if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
//         res.sendFile(path.resolve(`static/${req.url}`));
//     } else {
//         res.sendFile(path.resolve('static/index.html'));
//     }
// });
// //---------------------------------------------------------------------------------------------



app.listen(3000,
  () => console.log('TaskIt API server listening on port 30010')
);
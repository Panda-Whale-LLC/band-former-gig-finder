const express = require('express');
require('./models/bandFormerModels');
const app = express();

const { postsRouter } = require('./routes/posts.js');
const { usersRouter } = require('./routes/users.js');
const { photoRouter } = require('./routes/photo.js');
const PORT = 3000;

app.use('/photo', photoRouter);

app.use(express.json());


app.use('/posts', postsRouter);

app.use('/users', usersRouter);




app.use((req, res) => res.sendStatus(404));

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

//start

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
module.exports = server;

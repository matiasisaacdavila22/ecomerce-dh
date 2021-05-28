const express = require('express');
const {json} = require('body-parser')
const userRouter = require('./routes/userRouter')

const app = express();

app.use(json());
app.use(userRouter);

module.exports = app;
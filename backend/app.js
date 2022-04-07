const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const dbConnection = require('./config/database')
dbConnection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const glossary = require('./routes/glossaryRoutes')
const user = require('./routes/userRoutes')
const assessment = require('./routes/assessmentRoutes')

app.use('/glossary', glossary)
app.use('/user', user)
app.use('/assessment', assessment)

module.exports = app;

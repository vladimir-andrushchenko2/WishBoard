require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const errorHandlingMiddleware = require('./middlewares/errorHandling');
const celebrateErrorHandling = require('./middlewares/celebrateErrorHandling');
const corsHandling = require('./middlewares/corsHandling');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(corsHandling);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/', require('./routes'));

app.use(errorLogger);

// this is for Joi and celebrate
app.use(celebrateErrorHandling);

app.use(errorHandlingMiddleware);

module.exports = app;

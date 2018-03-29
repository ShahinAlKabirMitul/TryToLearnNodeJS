const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const app = express();
const courses = require('./courses');
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port  ${port} ...`));

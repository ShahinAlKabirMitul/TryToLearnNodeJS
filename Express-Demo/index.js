const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use(morgan('tiny'));

console.log('Application Name: ' + config.get('name'));

console.log('Mail Server Name: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

app.use(function(req, res, next) {
  console.log('Authentication..........');
  next();
});

var courses = [
  { id: 1, name: 'Course1' },
  { id: 2, name: 'Course2' },
  { id: 3, name: 'Course3' },
  { id: 4, name: 'Course4' },
];
app.get('/', (req, res) => {
  res.send('Hello World Mitul');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

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

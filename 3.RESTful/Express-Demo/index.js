const express = require('express');
const joi = require('joi');
const app = express();
const logger = require('./logger');
app.use(express.json());

app.use(logger);

app.use(function(req, res, next) {
  console.log('Authoticate');
  next();
});

const courses = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Node' },
  { id: 3, name: 'JS' },
];
app.get('/', (req, res) => {
  res.send('Hello ');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send('The course with the given id was not found');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: joi
      .string()
      .min(3)
      .required(),
  };
  return joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing port ${port}`));

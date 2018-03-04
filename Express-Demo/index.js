const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
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
    res.status(400).send(error.details[0].message);
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
  if (!course)
    res.status(404).send('The course with the given ID was not found');

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send('The course with the given ID was not found');
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

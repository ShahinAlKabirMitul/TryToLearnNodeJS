const express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());

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
  const schema = {
    name: joi
      .string()
      .min(3)
      .required(),
  };
  const result = joi.validate(req.body, schema);

  console.log(result);

  if (result.error) res.status(400).send(result.error);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  console.log(course);
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing port ${port}`));

const express = require('express');
const router = express.Router();
var courses = [
  { id: 1, name: 'Course1' },
  { id: 2, name: 'Course2' },
  { id: 3, name: 'Course3' },
  { id: 4, name: 'Course4' },
];

router.get('/', (req, res) => {
  res.render('index', { title: 'My Express App', message: 'Helllo Kobir !!!' });
});

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

router.delete('/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;

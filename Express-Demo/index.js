const express = require('express');
const app = express();
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
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(s => s.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port 3000 ${port} ...`));

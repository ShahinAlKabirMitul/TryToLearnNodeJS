const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World Mitul');
});

app.get('/api/courses', (req, res) => {
  res.send([50, 1, 2, 3]);
});
app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port 3000 ${port} ...`));

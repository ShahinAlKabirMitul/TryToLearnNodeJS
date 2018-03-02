const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([50,1,2,3]);
  });

app.listen(3000, () => console.log('Listening port 3000 ...'));

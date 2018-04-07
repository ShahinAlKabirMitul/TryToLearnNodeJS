const mongooes = require('mongoose');

mongooes
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongodb ..'))
  .catch(err => console.log('Could not connect to MongoDb ..', err));

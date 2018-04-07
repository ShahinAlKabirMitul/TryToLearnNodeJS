const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongodb ..'))
  .catch(err => console.log('Could not connect to MongoDb ..', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Node JS',
  author: 'Mosh',
  tags: ['node', 'backend'],
  isPublished: true,
});

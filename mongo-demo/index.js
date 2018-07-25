const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connedted to Mongo db database '))
  .catch(err => console.log('Could not connect to Mongo db ....', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
  const course = new Course({
    name: 'Angular js',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}
createCourse();

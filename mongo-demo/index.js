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

async function getCourses() {
  //const result = await Course.find();
  //const result = await Course.find({ author: 'Mosh' });
  const pageNumber = 2;
  const pageSize = 10;
  const result = await Course
    //.find({ author: 'Mosh' })
    // .find({ author: /.*m.*/i })
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();

  console.log(result);
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = 'mr kkr';
  const result = await course.save();
  console.log(result);
}

updateCourse('5b57cdde65c2e12db4db6cfc');

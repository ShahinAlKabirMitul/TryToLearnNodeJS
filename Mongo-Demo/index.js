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
  price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Node JS',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublished: true,
    price: 25,
  });
  const result = await course.save();
  console.log(result);
}
//createCourse();
// eq(equal)
//ne(not equal)
//gt(greater then)
//gte(greater then or equel)
//lt(less then)
//lte(less then or equal)
// in
//nin(not in)
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  //and or
  const courses = await Course.find()
    // Starts with
    .find({ author: 'mosh' })
    .skip(pageNumber - 1 * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();

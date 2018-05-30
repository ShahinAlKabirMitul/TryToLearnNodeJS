const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongodb ..'))
  .catch(err => console.log('Could not connect to mongo-exercises ..', err));
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});
const Course = mongoose.model('Course', courseSchema);
async function getCourses() {
  return await Course.find()
    // Starts with
    .find({ isPublished: true, tags: 'backend' })
    .limit(50)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}
async function run() {
  const courses = await getCourses();
  console.log(courses);
}
run();

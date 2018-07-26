const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connedted to Mongo db database '))
  .catch(err => console.log('Could not connect to Mongo db ....', err));

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
  return await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by*./i }])
    .sort({ price: -1 })
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}
run();

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connedted to Mongo db database '))
  .catch(err => console.log('Could not connect to Mongo db ....', err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
  const course = new Course({
    name: 'Angular js',
    author: 'Mosh',
    category: '_',
    tags: ['angular', 'frontend'],
    isPublished: true,
    price: 15,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
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
  // const result = await Course.update(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: 'Mitul',
  //       isPublished: false,
  //     },
  //   }
  // );
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Shahin AL Kabir mitul',
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

createCourse();

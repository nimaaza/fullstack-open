/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (blog, transformedBlog) => {
    transformedBlog.id = transformedBlog._id.toString();
    delete transformedBlog._id;
    delete transformedBlog.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

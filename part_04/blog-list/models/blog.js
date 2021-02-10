/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
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

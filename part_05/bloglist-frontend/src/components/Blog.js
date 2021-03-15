import React, { useState } from 'react';
import PropTypes from 'prop-types';

import blogService from '../services/blogs';

const Blog = (props) => {
  const [blog, setBlog] = useState(props.blog);
  const [showDetails, setShowDetails] = useState(false);

  const increaseLikes = () => {
    blogService
      .updateBlog({ ...blog, likes: blog.likes + 1 })
      .then(newBlog => setBlog(newBlog));
  };

  const removeBlog = () => {
    if (window.confirm('Really remove this blog?')) {
      blogService
        .deleteBlog(blog)
        .then(() => setBlog(null));
    }
  };

  if (!blog) {
    return null;
  }

  if (showDetails) {
    return (
      <div className="blog-item">
        <p>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></p>
        {blog.url}
        <p>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
        {blog.author}
        <br />
        <button onClick={removeBlog}>remove</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>{blog.title} <button onClick={() => setShowDetails(true)}>view</button></p>
      </div>
    );
  }
};

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

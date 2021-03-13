import React, { useState } from 'react';

import blogService from '../services/blogs'; 

const Blog = (props) => {
  const [blog, setBlog] = useState(props.blog);
  const [showDetails, setShowDetails] = useState(false);

  const increaseLikes = (event) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    blogService.updateBlog(newBlog);
    setBlog(newBlog);
  };

  if (showDetails) {
    return (
      <div className="blog-item">
        <p>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></p>
        {blog.url}
        <p>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
        {blog.author}
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

export default Blog;

import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);


  if (showDetails) {
    return (
      <div className="blog-item">
        <p>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></p>
        {blog.url}
        <p>likes {blog.likes} <button>like</button></p>
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

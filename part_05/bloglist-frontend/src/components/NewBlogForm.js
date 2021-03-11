import React, { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const newBlogHandler = (event) => {
    event.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    setTitle('');
    setAuthor('');
    setUrl('');

    createBlog(blog);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlogHandler}>
        <div>
          title:
        <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div>
          author:
        <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div>
          url:
        <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>

        <div>
          <input type="submit" value="create" />
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;

import React, { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('1');
  const [author, setAuthor] = useState('2');
  const [url, setUrl] = useState('3');

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
      <form id="form-new-blog" onSubmit={newBlogHandler}>
        <div>
          title:
          <input type="text" id="input-title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div>
          author:
          <input type="text" id="input-author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div>
          url:
          <input type="text" id="input-url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>

        <div>
          <input type="submit" value="create" />
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;

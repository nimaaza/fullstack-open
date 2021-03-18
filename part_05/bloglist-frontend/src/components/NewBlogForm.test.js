import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NewBlogForm from './NewBlogForm';

test('on submit, the form calls the proper handler', () => {
  const blog = {
    title: 'hello, hello!',
    author: 'Nima',
    url: 'http://nima.org',
  };
  const createBlog = jest.fn();

  const component = render(
    <NewBlogForm createBlog={createBlog} />
  );

  const form = component.container.querySelector('#form-new-blog');
  const titleInput = component.container.querySelector('#input-title');
  const authorInput = component.container.querySelector('#input-author');
  const urlInput = component.container.querySelector('#input-url');

  fireEvent.change(titleInput, { target: { value: blog.title } });
  fireEvent.change(authorInput, { target: { value: blog.author } });
  fireEvent.change(urlInput, { target: { value: blog.url } });

  fireEvent.submit(form);

  const passedData = createBlog.mock.calls[0][0];

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(passedData.title).toBe(blog.title);
  expect(passedData.author).toBe(blog.author);
  expect(passedData.url).toBe(blog.url);
});

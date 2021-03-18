import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Blog from './Blog';

test('blog renders title and author by default', () => {
  const blog = {
    title: 'hello, hello!',
    author: 'Nima',
    url: 'http://nima.org',
    likes: 12,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).not.toHaveTextContent(blog.author);
  expect(component.container).not.toHaveTextContent(blog.url);
  expect(component.container).not.toHaveTextContent(blog.likes);
});
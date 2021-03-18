import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

describe('test the blog component', () => {
  const blog = {
    title: 'hello, hello!',
    author: 'Nima',
    url: 'http://nima.org',
    likes: 12,
  };

  test('blog renders title and author by default', () => {
    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).not.toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test('the view and hide buttons do view and hide the relevant content', () => {
    const component = render(<Blog blog={blog} />);

    const viewButton = component.container.querySelector('#button-view');
    fireEvent.click(viewButton);

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);

    const hideButton = component.container.querySelector('#button-hide');
    fireEvent.click(hideButton);

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).not.toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });
});

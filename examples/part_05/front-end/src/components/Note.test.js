import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const component = render(
    <Note note={note} />
  );

  // three different testing approaches for text content
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  // or
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  // or
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

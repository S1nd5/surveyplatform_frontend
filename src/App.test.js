import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';

test('renders header', () => {
  render(<Home />);
  const headerElement = screen.getByText(/Surveys/i);
  expect(headerElement).toBeInTheDocument();
});

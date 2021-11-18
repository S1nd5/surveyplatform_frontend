import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';

test('renders header', () => {
  render(<Home />);
  const headerElement = screen.getByText(/Welcome to SurveyHub!/i);
  expect(headerElement).toBeInTheDocument();
});

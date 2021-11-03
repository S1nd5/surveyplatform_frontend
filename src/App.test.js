import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Survey demo 0.1 Front End/i);
  expect(linkElement).toBeInTheDocument();
});

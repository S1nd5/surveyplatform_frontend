import React from 'react';
import { render, screen } from '@testing-library/react';
import Console from './components/Console';

test('renders header', () => {
  render(<Console />);
  const headerElement = screen.getByText(/Admin console/i);
  expect(headerElement).toBeInTheDocument();
});

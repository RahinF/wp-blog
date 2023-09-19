import Navbar from '@components/Navbar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Navbar', () => {
  it('render a link to the homepage', () => {
    render(<Navbar />);
    const link = screen.getByRole('link', { name: 'WP Blog' });
    expect(link).toBeInTheDocument();
  });

  it('render a link to the homepage with correct href', () => {
    render(<Navbar />);
    const link = screen.getByRole('link', { name: 'WP Blog' });
    expect(link).toHaveAttribute('href', '/');
  });
});

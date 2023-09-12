import Home from '@app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders advice paragraph text', () => {
    render(<Home />);

    const text = screen.getByText(/home/i);

    expect(text).toBeInTheDocument();
  });
});

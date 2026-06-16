import { fireEvent, render, screen } from '@testing-library/react';

import HqPage from './page';

describe('HqPage', () => {
  it('renders painter board with 50 painters and supports actions', () => {
    render(<HqPage />);

    expect(screen.getByText('/hq')).toBeInTheDocument();
    expect(screen.getByText('Painter status board (50 total)')).toBeInTheDocument();
    expect(screen.getByText('Painter 1')).toBeInTheDocument();
    expect(screen.getByText('Painter 50')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Message' })[0]);
    expect(screen.getByText(/Message sent to Painter 1/i)).toBeInTheDocument();
  });
});

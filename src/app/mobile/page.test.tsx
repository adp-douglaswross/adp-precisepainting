import { fireEvent, render, screen } from '@testing-library/react';

import MobilePage from './page';

describe('MobilePage', () => {
  it('renders 4 painter steps and supports AI assist interaction', () => {
    render(<MobilePage />);

    expect(screen.getByText('/mobile')).toBeInTheDocument();
    expect(screen.getAllByText('1. Receive & Start Job').length).toBeGreaterThan(0);
    expect(screen.getByText('4. Complete & Submit Closeout')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Ask AI Copilot' }));
    expect(screen.getByText(/AI assist used/i)).toBeInTheDocument();
  });
});

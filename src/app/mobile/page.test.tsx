import { fireEvent, render, screen } from '@testing-library/react';

import MobilePage from './page';

describe('MobilePage', () => {
  it('renders mobile process flow and changes screen per selected step', () => {
    render(<MobilePage />);

    expect(screen.getByText('/mobile')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Step 1: Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Step 4: Closeout' })).toBeInTheDocument();
    expect(screen.getByText('Arrival check')).toBeInTheDocument();
    expect(screen.getByTitle('Client site map')).toBeInTheDocument();
    expect(screen.getByText('Job queue')).toBeInTheDocument();
    expect(screen.getByText(/Current job:/i)).toHaveTextContent('PP-2026-114');
    expect(screen.getByText('Required photos for this step')).toBeInTheDocument();
    expect(screen.getByText('Site arrival photo at front entry')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Step 2: Quote' }));
    expect(screen.getByText('Onsite quote & photos')).toBeInTheDocument();
    expect(screen.getByText('Before photos - all elevations')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Job PP-2026-122/i }));
    expect(screen.getByText(/Current job:/i)).toHaveTextContent('PP-2026-122');

    fireEvent.click(screen.getByRole('button', { name: 'Step 3: Execute' }));
    expect(screen.getByText('Work log')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Ask AI Copilot' }));
    expect(screen.getByText(/AI assist used/i)).toBeInTheDocument();
  });
});

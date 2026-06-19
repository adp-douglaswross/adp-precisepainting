import { fireEvent, render, screen } from '@testing-library/react';

import HqPage from './page';

describe('HqPage', () => {
  it('renders step-driven HQ screens and supports dispatch actions', () => {
    render(<HqPage />);

    expect(screen.getByText('/hq')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Step 1: Intake' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Step 4: Invoice' })).toBeInTheDocument();
    expect(screen.getByText('Intake approval board')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Step 2: Dispatch' }));
    expect(screen.getByText('Dispatch map console')).toBeInTheDocument();
    expect(screen.getByText('Active painter assignments')).toBeInTheDocument();
    expect(screen.getByTestId('hq-job-drill-panel')).toBeInTheDocument();
    expect(screen.getAllByText('Painter 1').length).toBeGreaterThan(0);
    expect(screen.getByText(/Selected job:/i)).toHaveTextContent('PP-2026-114');

    fireEvent.click(screen.getAllByRole('button', { name: 'PP-2026-122' })[0]);
    expect(screen.getByText(/Selected job:/i)).toHaveTextContent('PP-2026-122');

    fireEvent.click(screen.getAllByRole('button', { name: 'Message' })[0]);
    expect(screen.getByText(/Message sent to Painter 1/i)).toBeInTheDocument();
  });
});

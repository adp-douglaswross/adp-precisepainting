'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface HqStep {
  readonly title: string;
  readonly objective: string;
  readonly aiHint: string;
  readonly actionLabel: string;
}

interface PainterRecord {
  readonly id: number;
  readonly name: string;
  readonly status: 'On Site' | 'Traveling' | 'Available' | 'Needs Support';
  readonly currentJob: string;
  readonly location: string;
}

const HQ_STEPS: readonly HqStep[] = [
  {
    title: '1. Intake & Approvals',
    objective: 'Review incoming work and approve jobs for dispatch.',
    aiHint: 'AI ranks work by urgency, margin, and crew fit.',
    actionLabel: 'Approve selected jobs',
  },
  {
    title: '2. Dispatch, Map, Message, Reassign',
    objective: 'Allocate painters and adjust in real time.',
    aiHint: 'AI suggests reassignment paths using live load and location.',
    actionLabel: 'Reassign selected painter',
  },
  {
    title: '3. Monitor Progress + Timesheets/Payroll',
    objective: 'Track work execution and payroll readiness signals.',
    aiHint: 'AI flags incomplete timesheets and payroll anomalies.',
    actionLabel: 'Approve timesheet batch',
  },
  {
    title: '4. Invoice + Operational Analytics',
    objective: 'Issue invoices and review performance metrics.',
    aiHint: 'AI drafts invoice line items from work logs and variations.',
    actionLabel: 'Generate invoices now',
  },
];

const painterStatuses: readonly PainterRecord['status'][] = ['On Site', 'Traveling', 'Available', 'Needs Support'];

function createPainters(): PainterRecord[] {
  return Array.from({ length: 50 }, (_, index) => {
    const status = painterStatuses[index % painterStatuses.length];
    return {
      id: index + 1,
      name: `Painter ${index + 1}`,
      status,
      currentJob: `PP-2026-${120 + (index % 16)}`,
      location: ['CBD', 'North', 'East', 'West'][index % 4],
    };
  });
}

export default function HqPage(): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<string[]>(['In progress', 'Pending', 'Pending', 'Pending']);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [painters] = useState<PainterRecord[]>(createPainters);
  const [eventLog, setEventLog] = useState<string[]>(['HQ route loaded']);

  const currentStep = HQ_STEPS[activeStep];
  const filteredPainters = useMemo(() => {
    if (selectedStatus === 'All') {
      return painters;
    }
    return painters.filter((painter) => painter.status === selectedStatus);
  }, [painters, selectedStatus]);

  const statusCounts = useMemo(() => {
    return painters.reduce<Record<string, number>>((accumulator, painter) => {
      accumulator[painter.status] = (accumulator[painter.status] ?? 0) + 1;
      return accumulator;
    }, {});
  }, [painters]);

  const logAction = (message: string): void => {
    setEventLog((previous) => [`${new Date().toLocaleTimeString()} - ${message}`, ...previous].slice(0, 10));
  };

  const handleStepAction = (): void => {
    setStepStatus((previous) => {
      const updated = [...previous];
      updated[activeStep] = 'Completed';
      if (activeStep < HQ_STEPS.length - 1) {
        updated[activeStep + 1] = 'In progress';
      }
      return updated;
    });
    logAction(`${currentStep.actionLabel} clicked`);
  };

  const handleAiAssist = (): void => {
    logAction(`AI assist used for "${currentStep.title}"`);
  };

  return (
    <main className='mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 md:p-6'>
      <header className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-300 bg-white p-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-emerald-700'>HQ Route</p>
          <h1 className='text-2xl font-bold text-slate-900'>/hq</h1>
        </div>
        <div className='flex gap-2'>
          <Link href='/' className='rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100'>
            Home
          </Link>
          <Link href='/mobile' className='rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800'>
            Go to Mobile
          </Link>
        </div>
      </header>

      <section className='grid gap-4 xl:grid-cols-[1.7fr_1fr]'>
        <article className='rounded-lg border border-slate-300 bg-white p-4'>
          <div className='mb-4 grid gap-2 md:grid-cols-2'>
            {HQ_STEPS.map((step, index) => (
              <button
                key={step.title}
                type='button'
                onClick={() => setActiveStep(index)}
                className={`rounded-md border px-3 py-2 text-left text-sm ${
                  activeStep === index
                    ? 'border-emerald-600 bg-emerald-50 font-semibold text-emerald-900'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <p>{step.title}</p>
                <p className='text-xs'>{stepStatus[index]}</p>
              </button>
            ))}
          </div>

          <h2 className='text-lg font-semibold text-slate-900'>{currentStep.title}</h2>
          <p className='mt-1 text-sm text-slate-600'>{currentStep.objective}</p>

          <div className='mt-4 flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={handleStepAction}
              className='rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800'
            >
              {currentStep.actionLabel}
            </button>
            <button
              type='button'
              onClick={handleAiAssist}
              className='rounded-md border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50'
            >
              Ask AI Operations Copilot
            </button>
          </div>

          <div className='mt-6 rounded-md border border-slate-300 p-3'>
            <div className='mb-3 flex flex-wrap items-center justify-between gap-2'>
              <h3 className='text-base font-semibold text-slate-900'>Painter status board (50 total)</h3>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className='rounded border border-slate-300 px-2 py-1 text-sm'
              >
                <option value='All'>All</option>
                {painterStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <p className='mb-2 text-xs text-slate-600'>
              On Site: {statusCounts['On Site']} | Traveling: {statusCounts['Traveling']} | Available:{' '}
              {statusCounts['Available']} | Needs Support: {statusCounts['Needs Support']}
            </p>
            <div className='max-h-80 overflow-auto rounded border border-slate-200'>
              <table className='w-full text-left text-sm'>
                <thead className='sticky top-0 bg-slate-100 text-xs uppercase text-slate-600'>
                  <tr>
                    <th className='px-2 py-2'>Painter</th>
                    <th className='px-2 py-2'>Status</th>
                    <th className='px-2 py-2'>Job</th>
                    <th className='px-2 py-2'>Zone</th>
                    <th className='px-2 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPainters.map((painter) => (
                    <tr key={painter.id} className='border-t border-slate-200'>
                      <td className='px-2 py-2'>{painter.name}</td>
                      <td className='px-2 py-2'>{painter.status}</td>
                      <td className='px-2 py-2'>{painter.currentJob}</td>
                      <td className='px-2 py-2'>{painter.location}</td>
                      <td className='px-2 py-2'>
                        <div className='flex flex-wrap gap-1'>
                          <button
                            type='button'
                            onClick={() => logAction(`Message sent to ${painter.name}`)}
                            className='rounded bg-slate-200 px-2 py-1 text-xs hover:bg-slate-300'
                          >
                            Message
                          </button>
                          <button
                            type='button'
                            onClick={() => logAction(`Reassigned ${painter.name}`)}
                            className='rounded bg-amber-200 px-2 py-1 text-xs hover:bg-amber-300'
                          >
                            Reassign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <aside className='rounded-lg border border-emerald-300 bg-emerald-50 p-4'>
          <h3 className='text-lg font-semibold text-emerald-950'>AI guidance for this step</h3>
          <p className='mt-2 text-sm text-emerald-900'>{currentStep.aiHint}</p>
          <p className='mt-4 text-sm font-medium text-emerald-950'>Recent operations events</p>
          <ul className='mt-2 space-y-2 text-xs text-emerald-900'>
            {eventLog.map((entry) => (
              <li key={entry} className='rounded border border-emerald-200 bg-white px-2 py-1'>
                {entry}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}

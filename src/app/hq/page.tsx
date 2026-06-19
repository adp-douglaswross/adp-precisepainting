'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface HqStep {
  readonly title: string;
  readonly shortTitle: string;
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

interface HqJob {
  readonly id: string;
  readonly customer: string;
  readonly status: 'Pending approval' | 'Dispatched' | 'In progress' | 'Closeout review';
  readonly assignedPainter: string;
  readonly zone: string;
  readonly quoteValue: string;
  readonly riskNote: string;
}

const HQ_STEPS: readonly HqStep[] = [
  {
    title: '1. Intake & Approvals',
    shortTitle: 'Intake',
    objective: 'Review incoming work and approve jobs for dispatch.',
    aiHint: 'AI ranks work by urgency, margin, and crew fit.',
    actionLabel: 'Approve selected jobs',
  },
  {
    title: '2. Dispatch, Map, Message, Reassign',
    shortTitle: 'Dispatch',
    objective: 'Allocate painters and adjust in real time.',
    aiHint: 'AI suggests reassignment paths using live load and location.',
    actionLabel: 'Reassign selected painter',
  },
  {
    title: '3. Monitor Progress + Timesheets/Payroll',
    shortTitle: 'Monitor',
    objective: 'Track work execution and payroll readiness signals.',
    aiHint: 'AI flags incomplete timesheets and payroll anomalies.',
    actionLabel: 'Approve timesheet batch',
  },
  {
    title: '4. Invoice + Operational Analytics',
    shortTitle: 'Invoice',
    objective: 'Issue invoices and review performance metrics.',
    aiHint: 'AI drafts invoice line items from work logs and variations.',
    actionLabel: 'Generate invoices now',
  },
];

const painterStatuses: readonly PainterRecord['status'][] = ['On Site', 'Traveling', 'Available', 'Needs Support'];
const intakeScenarios: readonly string[] = [
  'HQ-002 Missing site contact requires follow-up before approval',
  'HQ-005 Multi-room quote requires supervisor approval',
  'HQ-008 Hazardous-material compliance check required',
  'HQ-023 Priority conflict between two urgent jobs',
];
const dispatchScenarios: readonly string[] = [
  'HQ-026 Assign nearest available painter by GPS',
  'HQ-028 Reassign due to traffic delay risk',
  'HQ-038 Site closed on arrival; redeploy painter',
  'HQ-047 Bulk message to all active painters',
];
const monitoringScenarios: readonly string[] = [
  'HQ-052 Missing timer start prompt',
  'HQ-057 Material usage exceeds estimate by 15%',
  'HQ-062 Duplicate timesheet entry detected',
  'HQ-071 Expense-to-hours anomaly flagged',
];
const closeoutScenarios: readonly string[] = [
  'HQ-077 Include approved variation line items',
  'HQ-083 Invoice hold due to disputed variation',
  'HQ-091 Margin analytics by painter and job type',
  'HQ-099 Close job with full audit packet',
];
const HQ_JOBS: readonly HqJob[] = [
  {
    id: 'PP-2026-114',
    customer: 'Olivia Harper',
    status: 'In progress',
    assignedPainter: 'Painter 1',
    zone: 'East',
    quoteValue: '$8,400',
    riskNote: 'Moisture patch requires stain blocker variation',
  },
  {
    id: 'PP-2026-122',
    customer: 'Northside Strata',
    status: 'Dispatched',
    assignedPainter: 'Painter 7',
    zone: 'North',
    quoteValue: '$13,200',
    riskNote: 'Traffic risk window after 3:30pm',
  },
  {
    id: 'PP-2026-127',
    customer: 'Coastal Retail Group',
    status: 'Pending approval',
    assignedPainter: 'Painter 12',
    zone: 'CBD',
    quoteValue: '$4,900',
    riskNote: 'Access only before 10:00am',
  },
];

function createPainters(): PainterRecord[] {
  return Array.from({ length: 50 }, (_, index) => {
    const status = painterStatuses[index % painterStatuses.length];
    const job = HQ_JOBS[index % HQ_JOBS.length];
    return {
      id: index + 1,
      name: `Painter ${index + 1}`,
      status,
      currentJob: job.id,
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
  const [pendingPhotoReviews] = useState<string[]>([
    'PP-2026-114 stairwell moisture evidence',
    'PP-2026-122 facade prep complete',
    'PP-2026-127 balcony balustrade variation',
  ]);
  const [messageDraft, setMessageDraft] = useState<string>('Hi team, traffic is building in the east. Use alternate route via Bondi Rd.');
  const [selectedJobId, setSelectedJobId] = useState<string>(HQ_JOBS[0].id);

  const currentStep = HQ_STEPS[activeStep];
  const selectedJob = useMemo(() => HQ_JOBS.find((job) => job.id === selectedJobId) ?? HQ_JOBS[0], [selectedJobId]);
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
  const onSiteCount = statusCounts['On Site'] ?? 0;
  const travelCount = statusCounts['Traveling'] ?? 0;
  const dispatchPainters = filteredPainters.slice(0, 10);

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

  const stepContent = useMemo((): JSX.Element => {
    if (activeStep === 0) {
      return (
        <section className='space-y-4' data-testid='hq-step-panel'>
          <div className='rounded-md border border-slate-300 p-3'>
            <h3 className='text-base font-semibold text-slate-900'>Intake approval board</h3>
            <p className='mt-1 text-sm text-slate-600'>Prioritized from business scenarios for Step 1 intake and approvals.</p>
            <ul className='mt-2 space-y-2 text-sm text-slate-700'>
              {intakeScenarios.map((scenario) => (
                <li key={scenario} className='rounded bg-slate-50 px-2 py-1'>
                  {scenario}
                </li>
              ))}
            </ul>
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            <button
              type='button'
              onClick={() => logAction('Approval routed to backup manager')}
              className='rounded-md border border-slate-300 px-3 py-2 text-left text-sm hover:bg-slate-50'
            >
              Route selected approvals
            </button>
            <button
              type='button'
              onClick={() => logAction('Rejected quote returned with rework notes')}
              className='rounded-md border border-slate-300 px-3 py-2 text-left text-sm hover:bg-slate-50'
            >
              Return for rework with reason
            </button>
          </div>
        </section>
      );
    }

    if (activeStep === 1) {
      return (
        <section className='space-y-4' data-testid='hq-step-panel'>
          <div className='rounded-md border border-slate-300 p-3'>
            <h3 className='text-base font-semibold text-slate-900'>Dispatch map console</h3>
            <p className='mt-1 text-sm text-slate-600'>Step 2 focuses on assignment, messaging, and reassignment actions.</p>
            <iframe
              title='Sydney dispatch map'
              src='https://www.google.com/maps?q=Sydney%20NSW&output=embed'
              className='mt-2 h-44 w-full rounded border border-slate-200'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>
          <div className='rounded-md border border-slate-300 p-3'>
            <p className='text-sm font-semibold text-slate-900'>Dispatch scenario queue</p>
            <ul className='mt-2 space-y-2 text-sm text-slate-700'>
              {dispatchScenarios.map((scenario) => (
                <li key={scenario} className='rounded bg-slate-50 px-2 py-1'>
                  {scenario}
                </li>
              ))}
            </ul>
          </div>
          <div className='rounded-md border border-slate-300 p-3'>
            <div className='mb-2 flex items-center justify-between gap-2'>
              <h4 className='text-sm font-semibold text-slate-900'>Active painter assignments</h4>
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
            <div className='overflow-x-auto rounded border border-slate-200'>
              <table className='w-full text-left text-sm'>
                <thead className='bg-slate-100 text-xs uppercase text-slate-600'>
                  <tr>
                    <th className='px-2 py-2'>Painter</th>
                    <th className='px-2 py-2'>Status</th>
                    <th className='px-2 py-2'>Job</th>
                    <th className='px-2 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dispatchPainters.map((painter) => (
                    <tr key={painter.id} className='border-t border-slate-200'>
                      <td className='px-2 py-2'>{painter.name}</td>
                      <td className='px-2 py-2'>{painter.status}</td>
                      <td className='px-2 py-2'>
                        <button
                          type='button'
                          onClick={() => setSelectedJobId(painter.currentJob)}
                          className='rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-900 hover:bg-blue-100'
                        >
                          {painter.currentJob}
                        </button>
                      </td>
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
          <div className='rounded-md border border-slate-300 p-3'>
            <h4 className='text-sm font-semibold text-slate-900'>Quick broadcast (prefilled)</h4>
            <textarea
              value={messageDraft}
              onChange={(event) => setMessageDraft(event.target.value)}
              className='mt-2 h-20 w-full rounded border border-slate-300 p-2 text-sm'
            />
            <button
              type='button'
              onClick={() => logAction('Broadcast sent to all active crews')}
              className='mt-2 rounded bg-slate-800 px-3 py-2 text-xs font-medium text-white hover:bg-slate-900'
            >
              Send broadcast
            </button>
          </div>
        </section>
      );
    }

    if (activeStep === 2) {
      return (
        <section className='space-y-4' data-testid='hq-step-panel'>
          <div className='rounded-md border border-slate-300 p-3'>
            <h3 className='text-base font-semibold text-slate-900'>Timesheet and payroll control</h3>
            <p className='mt-1 text-sm text-slate-600'>Step 3 catches anomalies before payroll-ready state.</p>
            <ul className='mt-2 space-y-2 text-sm text-slate-700'>
              {monitoringScenarios.map((scenario) => (
                <li key={scenario} className='rounded bg-slate-50 px-2 py-1'>
                  {scenario}
                </li>
              ))}
            </ul>
          </div>
          <div className='grid gap-3 md:grid-cols-3'>
            <div className='rounded-md border border-slate-300 p-3 text-sm'>
              <p className='text-xs text-slate-500'>Timesheets pending review</p>
              <p className='mt-1 text-2xl font-semibold text-slate-900'>12</p>
            </div>
            <div className='rounded-md border border-slate-300 p-3 text-sm'>
              <p className='text-xs text-slate-500'>Anomalies requiring manager</p>
              <p className='mt-1 text-2xl font-semibold text-amber-700'>3</p>
            </div>
            <div className='rounded-md border border-slate-300 p-3 text-sm'>
              <p className='text-xs text-slate-500'>Payroll-ready jobs</p>
              <p className='mt-1 text-2xl font-semibold text-emerald-700'>28</p>
            </div>
          </div>
          <button
            type='button'
            onClick={() => logAction('Bulk-approved clean timesheets')}
            className='rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50'
          >
            Bulk approve clean timesheets
          </button>
        </section>
      );
    }

    return (
      <section className='space-y-4' data-testid='hq-step-panel'>
        <div className='rounded-md border border-slate-300 p-3'>
          <h3 className='text-base font-semibold text-slate-900'>Invoice closeout and analytics</h3>
          <p className='mt-1 text-sm text-slate-600'>Step 4 handles invoice release and performance review.</p>
          <ul className='mt-2 space-y-2 text-sm text-slate-700'>
            {closeoutScenarios.map((scenario) => (
              <li key={scenario} className='rounded bg-slate-50 px-2 py-1'>
                {scenario}
              </li>
            ))}
          </ul>
        </div>
        <div className='grid gap-3 md:grid-cols-2'>
          <div className='rounded-md border border-slate-300 p-3'>
            <p className='text-xs text-slate-500'>Invoices ready to send</p>
            <p className='mt-1 text-2xl font-semibold text-slate-900'>9</p>
          </div>
          <div className='rounded-md border border-slate-300 p-3'>
            <p className='text-xs text-slate-500'>Weekly margin trend</p>
            <p className='mt-1 text-2xl font-semibold text-emerald-700'>+4.2%</p>
          </div>
        </div>
        <button
          type='button'
          onClick={() => logAction('Invoice batch sent to finance system')}
          className='rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50'
        >
          Send invoice batch
        </button>
      </section>
    );
  }, [activeStep, dispatchPainters, messageDraft, selectedStatus]);

  return (
    <main className='mx-auto flex min-h-screen max-w-5xl flex-col gap-4 overflow-y-auto p-4 md:p-6'>
      <header className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-300 bg-white p-4'>
        <div className='flex items-center gap-3'>
          <Image
            src='/precise-painting/branding/precise-painting-logo-v2.png'
            alt='Precise Painting logo'
            width={56}
            height={56}
            className='h-14 w-14 rounded-xl border border-emerald-200 bg-white p-1 object-contain'
            priority
          />
          <div>
            <p className='text-xs font-semibold uppercase tracking-wide text-emerald-700'>HQ Route</p>
            <h1 className='text-2xl font-bold text-slate-900'>/hq</h1>
          </div>
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

      <section className='rounded-lg border border-slate-300 bg-white p-3'>
        <div className='mb-2 flex items-center justify-between text-xs'>
          <span className='font-medium text-slate-700'>HQ 4-step process</span>
          <span className='font-semibold text-emerald-700'>{Math.round(((activeStep + 1) / HQ_STEPS.length) * 100)}%</span>
        </div>
        <div className='h-2 w-full rounded bg-slate-200'>
          <div
            className='h-2 rounded bg-emerald-600 transition-all'
            style={{ width: `${((activeStep + 1) / HQ_STEPS.length) * 100}%` }}
          />
        </div>
        <ol className='mt-3 flex items-center gap-2 overflow-x-auto pb-1'>
          {HQ_STEPS.map((step, index) => (
            <li key={step.title} className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => setActiveStep(index)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${
                  activeStep === index
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
                aria-label={`Step ${index + 1}: ${step.shortTitle}`}
              >
                {index + 1}. {step.shortTitle}
              </button>
              <span className='text-[10px] text-slate-500'>{stepStatus[index]}</span>
              {index < HQ_STEPS.length - 1 ? <span className='text-slate-400'>→</span> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className='grid gap-4'>
        <article className='rounded-lg border border-slate-300 bg-white p-4'>
          <h2 className='text-lg font-semibold text-slate-900'>{currentStep.title}</h2>
          <p className='mt-1 text-sm text-slate-600'>{currentStep.objective}</p>
          <div className='mt-3 grid gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 md:grid-cols-3'>
            <p>
              <span className='font-semibold'>Live on-site crews:</span> {onSiteCount}
            </p>
            <p>
              <span className='font-semibold'>Traveling:</span> {travelCount}
            </p>
            <p>
              <span className='font-semibold'>AI confidence:</span> 92% dispatch fit
            </p>
          </div>

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
          <div className='mt-4'>{stepContent}</div>
          <div className='mt-4 rounded-md border border-slate-300 p-3' data-testid='hq-job-drill-panel'>
            <h3 className='text-sm font-semibold text-slate-900'>Job drill-in</h3>
            <p className='mt-1 text-xs text-slate-600'>
              Selected job: <span className='font-semibold text-slate-900'>{selectedJob.id}</span>
            </p>
            <div className='mt-2 grid gap-2 text-xs text-slate-700 md:grid-cols-2'>
              <p className='rounded bg-slate-50 px-2 py-1'>
                Customer: <span className='font-semibold'>{selectedJob.customer}</span>
              </p>
              <p className='rounded bg-slate-50 px-2 py-1'>
                Status: <span className='font-semibold'>{selectedJob.status}</span>
              </p>
              <p className='rounded bg-slate-50 px-2 py-1'>
                Assigned: <span className='font-semibold'>{selectedJob.assignedPainter}</span>
              </p>
              <p className='rounded bg-slate-50 px-2 py-1'>
                Zone: <span className='font-semibold'>{selectedJob.zone}</span>
              </p>
              <p className='rounded bg-slate-50 px-2 py-1'>
                Quote value: <span className='font-semibold'>{selectedJob.quoteValue}</span>
              </p>
              <p className='rounded bg-amber-50 px-2 py-1 text-amber-900'>
                Risk note: <span className='font-semibold'>{selectedJob.riskNote}</span>
              </p>
            </div>
          </div>
          <div className='mt-4 rounded-md border border-slate-300 p-3'>
            <h3 className='text-sm font-semibold text-slate-900'>Photo evidence queue</h3>
            <p className='mt-1 text-xs text-slate-600'>Auto-tagged from field uploads for fast closeout checks.</p>
            <ul className='mt-2 space-y-1 text-xs text-slate-700'>
              {pendingPhotoReviews.map((item) => (
                <li key={item} className='rounded bg-slate-50 px-2 py-1'>
                  {item}
                </li>
              ))}
            </ul>
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

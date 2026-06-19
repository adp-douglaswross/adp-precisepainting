'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, type JSX } from 'react';

interface PainterStep {
  readonly title: string;
  readonly shortTitle: string;
  readonly objective: string;
  readonly aiHint: string;
  readonly actionLabel: string;
}

const PAINTER_STEPS: readonly PainterStep[] = [
  {
    title: '1. Receive & Start Job',
    shortTitle: 'Start',
    objective: 'Confirm assignment, ETA, and onsite readiness.',
    aiHint: 'AI checks traffic/route and suggests a better arrival window.',
    actionLabel: 'Confirm start',
  },
  {
    title: '2. Quote + Variation + Materials',
    shortTitle: 'Quote',
    objective: 'Capture scope and estimate paint/material requirements.',
    aiHint: 'AI pre-fills quantities and flags likely under-estimation risks.',
    actionLabel: 'Submit quote/variation',
  },
  {
    title: '3. Execute + Time/Expense Tracking',
    shortTitle: 'Execute',
    objective: 'Track work progress, labor time, and expense uploads.',
    aiHint: 'AI validates missing entries and proposes next best task.',
    actionLabel: 'Log work update',
  },
  {
    title: '4. Complete & Submit Closeout',
    shortTitle: 'Closeout',
    objective: 'Finalize work evidence and closeout packet for HQ.',
    aiHint: 'AI summarizes completed scope, exceptions, and invoice readiness.',
    actionLabel: 'Submit closeout',
  },
];

interface MobileFormState {
  readonly jobId: string;
  readonly clientSite: string;
  readonly eta: string;
  readonly quoteType: string;
  readonly areaM2: string;
  readonly paintType: string;
  readonly variationReason: string;
  readonly hoursToday: string;
  readonly expensesToday: string;
  readonly completionSummary: string;
}

interface MobileJob {
  readonly id: string;
  readonly customer: string;
  readonly address: string;
  readonly quoteType: string;
  readonly areaM2: string;
  readonly checklistByStep: readonly (readonly string[])[];
}

const MOBILE_JOBS: readonly MobileJob[] = [
  {
    id: 'PP-2026-114',
    customer: 'Olivia Harper',
    address: '52 Harbour View Road, Bellevue Hill NSW',
    quoteType: 'Interior refresh',
    areaM2: '180',
    checklistByStep: [
      ['Site arrival photo at front entry', 'Safety/PPE setup photo'],
      ['Before photos - all elevations', 'Damage/moisture close-up photo'],
      ['Coat progress checkpoint photo', 'Expense receipt photo if purchased'],
      ['After photos - all rooms', 'Customer sign-off photo'],
    ],
  },
  {
    id: 'PP-2026-122',
    customer: 'Northside Strata',
    address: '18 Bay Street, North Sydney NSW',
    quoteType: 'External repaint',
    areaM2: '260',
    checklistByStep: [
      ['Scaffold setup photo', 'Access condition photo'],
      ['Facade before set (north/east/west/south)', 'Peeling paint defect photo'],
      ['Progress photo after prep', 'Material delivery receipt photo'],
      ['Final facade photo set', 'Waste disposal compliance photo'],
    ],
  },
  {
    id: 'PP-2026-127',
    customer: 'Coastal Retail Group',
    address: '201 Oxford Street, Bondi Junction NSW',
    quoteType: 'Retail touch-up',
    areaM2: '95',
    checklistByStep: [
      ['Storefront condition photo', 'Access constraints photo'],
      ['Before photos for variation surfaces', 'Color mismatch reference photo'],
      ['In-progress quality checkpoint photo', 'Any delay evidence photo'],
      ['After photos and signage area', 'Closeout handover photo'],
    ],
  },
];

function getInitialFormState(): MobileFormState {
  return {
    jobId: 'PP-2026-114',
    clientSite: '52 Harbour View Road, Bellevue Hill NSW',
    eta: '22 min',
    quoteType: 'Interior refresh',
    areaM2: '180',
    paintType: 'Low-VOC interior satin',
    variationReason: 'Moisture marks in stairwell need stain blocker',
    hoursToday: '7.5',
    expensesToday: '45',
    completionSummary: 'Walls and trims complete, stairwell stain block applied, cleanup done.',
  };
}

export default function MobilePage(): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<string[]>(['In progress', 'Pending', 'Pending', 'Pending']);
  const [formState, setFormState] = useState<MobileFormState>(getInitialFormState);
  const [selectedJobId, setSelectedJobId] = useState<string>(MOBILE_JOBS[0].id);
  const [activityLog, setActivityLog] = useState<string[]>(['Mobile route loaded']);
  const [capturedPhotosByJob, setCapturedPhotosByJob] = useState<Record<string, string[]>>({
    'PP-2026-114': ['front-elevation.jpg', 'living-room-wall.jpg', 'stairwell-detail.jpg'],
    'PP-2026-122': ['facade-before-east.jpg'],
    'PP-2026-127': ['shopfront-before.jpg'],
  });

  const currentStep = PAINTER_STEPS[activeStep];
  const selectedJob = useMemo(
    () => MOBILE_JOBS.find((job) => job.id === selectedJobId) ?? MOBILE_JOBS[0],
    [selectedJobId],
  );
  const requiredPhotos = selectedJob.checklistByStep[activeStep] ?? [];
  const capturedPhotos = capturedPhotosByJob[selectedJob.id] ?? [];
  const progress = useMemo(() => ((activeStep + 1) / PAINTER_STEPS.length) * 100, [activeStep]);
  const mapQuery = encodeURIComponent(selectedJob.address);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  const logAction = (message: string): void => {
    setActivityLog((previous) => [`${new Date().toLocaleTimeString()} - ${message}`, ...previous].slice(0, 8));
  };

  const handleInputChange = (key: keyof MobileFormState, value: string): void => {
    setFormState((previous) => ({ ...previous, [key]: value }));
  };

  const handleStepAction = (): void => {
    setStepStatus((previous) => {
      const updated = [...previous];
      updated[activeStep] = 'Completed';
      if (activeStep < PAINTER_STEPS.length - 1) {
        updated[activeStep + 1] = 'In progress';
      }
      return updated;
    });
    logAction(`${currentStep.actionLabel} clicked`);
    if (activeStep < PAINTER_STEPS.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleAiAssist = (): void => {
    logAction(`AI assist used for "${currentStep.title}"`);
  };

  const handlePhotoCapture = (files: FileList | null): void => {
    if (!files || files.length === 0) {
      return;
    }
    const fileNames = Array.from(files).map((file) => file.name);
    setCapturedPhotosByJob((previous) => ({
      ...previous,
      [selectedJob.id]: [...fileNames, ...(previous[selectedJob.id] ?? [])].slice(0, 8),
    }));
    logAction(`Captured ${fileNames.length} photo${fileNames.length > 1 ? 's' : ''} for ${selectedJob.id}`);
  };

  const handleSelectJob = (jobId: string): void => {
    const job = MOBILE_JOBS.find((candidate) => candidate.id === jobId);
    if (!job) {
      return;
    }
    setSelectedJobId(job.id);
    setFormState((previous) => ({
      ...previous,
      jobId: job.id,
      clientSite: job.address,
      quoteType: job.quoteType,
      areaM2: job.areaM2,
    }));
    logAction(`Opened job ${job.id}`);
  };

  const stepContent = useMemo((): JSX.Element => {
    if (activeStep === 0) {
      return (
        <section data-testid='mobile-step-panel' className='space-y-3'>
          <h2 className='text-lg font-semibold text-slate-900'>Arrival check</h2>
          <p className='text-sm text-slate-600'>Confirm travel and readiness before walking onsite.</p>
          <label className='block text-sm text-slate-700'>
            <span className='mb-1 block font-medium'>ETA</span>
            <input
              value={formState.eta}
              onChange={(event) => handleInputChange('eta', event.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2'
            />
          </label>
          <label className='block text-sm text-slate-700'>
            <span className='mb-1 block font-medium'>Site address</span>
            <input
              value={formState.clientSite}
              onChange={(event) => handleInputChange('clientSite', event.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2'
            />
          </label>
        </section>
      );
    }

    if (activeStep === 1) {
      return (
        <section data-testid='mobile-step-panel' className='space-y-3'>
          <h2 className='text-lg font-semibold text-slate-900'>Onsite quote & photos</h2>
          <p className='text-sm text-slate-600'>Capture scope quickly. AI prefilled known quote defaults.</p>
          <div className='grid grid-cols-2 gap-3'>
            <label className='text-sm text-slate-700'>
              <span className='mb-1 block font-medium'>Type</span>
              <input
                value={formState.quoteType}
                onChange={(event) => handleInputChange('quoteType', event.target.value)}
                className='w-full rounded-md border border-slate-300 px-3 py-2'
              />
            </label>
            <label className='text-sm text-slate-700'>
              <span className='mb-1 block font-medium'>Area m²</span>
              <input
                value={formState.areaM2}
                onChange={(event) => handleInputChange('areaM2', event.target.value)}
                className='w-full rounded-md border border-slate-300 px-3 py-2'
              />
            </label>
          </div>
          <label className='block text-sm text-slate-700'>
            <span className='mb-1 block font-medium'>Variation reason</span>
            <input
              value={formState.variationReason}
              onChange={(event) => handleInputChange('variationReason', event.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2'
            />
          </label>
        </section>
      );
    }

    if (activeStep === 2) {
      return (
        <section data-testid='mobile-step-panel' className='space-y-3'>
          <h2 className='text-lg font-semibold text-slate-900'>Work log</h2>
          <p className='text-sm text-slate-600'>Log only today&apos;s key numbers. HQ gets the rest from AI summary.</p>
          <div className='grid grid-cols-2 gap-3'>
            <label className='text-sm text-slate-700'>
              <span className='mb-1 block font-medium'>Hours</span>
              <input
                value={formState.hoursToday}
                onChange={(event) => handleInputChange('hoursToday', event.target.value)}
                className='w-full rounded-md border border-slate-300 px-3 py-2'
              />
            </label>
            <label className='text-sm text-slate-700'>
              <span className='mb-1 block font-medium'>Expenses ($)</span>
              <input
                value={formState.expensesToday}
                onChange={(event) => handleInputChange('expensesToday', event.target.value)}
                className='w-full rounded-md border border-slate-300 px-3 py-2'
              />
            </label>
          </div>
          <label className='block text-sm text-slate-700'>
            <span className='mb-1 block font-medium'>Paint spec used</span>
            <input
              value={formState.paintType}
              onChange={(event) => handleInputChange('paintType', event.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2'
            />
          </label>
        </section>
      );
    }

    return (
      <section data-testid='mobile-step-panel' className='space-y-3'>
        <h2 className='text-lg font-semibold text-slate-900'>Closeout summary</h2>
        <p className='text-sm text-slate-600'>Final review before sending to HQ and invoicing.</p>
        <label className='block text-sm text-slate-700'>
          <span className='mb-1 block font-medium'>Completion summary</span>
          <textarea
            value={formState.completionSummary}
            onChange={(event) => handleInputChange('completionSummary', event.target.value)}
            className='h-24 w-full rounded-md border border-slate-300 px-3 py-2'
          />
        </label>
        <p className='rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-900'>
          {capturedPhotos.length} photos attached for evidence.
        </p>
      </section>
    );
  }, [activeStep, capturedPhotos.length, formState]);

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-md flex-col gap-3 p-3'>
      <header className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-300 bg-white p-4'>
        <div className='flex items-center gap-3'>
          <Image
            src='/precise-painting/branding/precise-painting-logo-v2.png'
            alt='Precise Painting logo'
            width={56}
            height={56}
            className='h-14 w-14 rounded-xl border border-blue-200 bg-white p-1 object-contain'
            priority
          />
          <div>
            <p className='text-xs font-semibold uppercase tracking-wide text-blue-700'>Painter Route</p>
            <h1 className='text-xl font-bold text-slate-900'>/mobile</h1>
          </div>
        </div>
        <div className='flex gap-2 text-sm'>
          <Link href='/' className='rounded-md border border-slate-300 px-2 py-1.5 font-medium hover:bg-slate-100'>
            Home
          </Link>
          <Link href='/hq' className='rounded-md bg-emerald-700 px-2 py-1.5 font-medium text-white hover:bg-emerald-800'>
            HQ
          </Link>
        </div>
      </header>

      <section className='rounded-lg border border-slate-300 bg-white p-3'>
        <p className='text-xs font-medium uppercase tracking-wide text-blue-700'>Job queue</p>
        <div className='mt-2 flex gap-2 overflow-x-auto pb-1'>
          {MOBILE_JOBS.map((job) => (
            <button
              key={job.id}
              type='button'
              onClick={() => handleSelectJob(job.id)}
              className={`rounded-md border px-3 py-2 text-left text-xs ${
                selectedJob.id === job.id ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-300 bg-white'
              }`}
            >
              <p className='font-semibold'>Job {job.id}</p>
              <p className='text-slate-600'>{job.customer}</p>
            </button>
          ))}
        </div>
        <p className='mt-2 text-xs text-slate-600'>
          Current job: <span className='font-semibold text-slate-900'>{selectedJob.id}</span> — {selectedJob.address}
        </p>
      </section>

      <section className='rounded-lg border border-slate-300 bg-white p-3'>
        <div className='mb-2 flex items-center justify-between text-xs'>
          <span className='font-medium text-slate-700'>4-step process</span>
          <span className='font-semibold text-blue-700'>{Math.round(progress)}%</span>
        </div>
        <div className='h-2 w-full rounded bg-slate-200'>
          <div className='h-2 rounded bg-blue-600 transition-all' style={{ width: `${progress}%` }} />
        </div>
        <ol className='mt-3 flex items-center gap-2 overflow-x-auto pb-1'>
          {PAINTER_STEPS.map((step, index) => (
            <li key={step.title} className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => setActiveStep(index)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${
                  activeStep === index
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
                aria-label={`Step ${index + 1}: ${step.shortTitle}`}
              >
                {index + 1}. {step.shortTitle}
              </button>
              <span className='text-[10px] text-slate-500'>{stepStatus[index]}</span>
              {index < PAINTER_STEPS.length - 1 ? <span className='text-slate-400'>→</span> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className='rounded-lg border border-slate-300 bg-white p-3'>
        <p className='text-xs font-medium uppercase tracking-wide text-blue-700'>Map</p>
        <iframe
          title='Client site map'
          src={mapEmbedUrl}
          className='mt-2 h-44 w-full rounded border border-slate-200'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </section>

      <article className='rounded-lg border border-slate-300 bg-white p-4'>
        <p className='text-xs font-semibold uppercase tracking-wide text-blue-700'>{currentStep.title}</p>
        <p className='mt-1 text-sm text-slate-600'>{currentStep.objective}</p>
        <div className='mt-3 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-900'>{currentStep.aiHint}</div>
        <div className='mt-3'>{stepContent}</div>

        <section className='mt-4 rounded-md border border-slate-300 p-3'>
          <p className='text-sm font-semibold text-slate-900'>Photo capture</p>
          <p className='mt-1 text-xs text-slate-600'>Required photos for this step</p>
          <ul className='mt-2 space-y-1 text-xs text-slate-700'>
            {requiredPhotos.map((requirement) => (
              <li key={requirement} className='rounded bg-blue-50 px-2 py-1 text-blue-900'>
                {requirement}
              </li>
            ))}
          </ul>
          <input
            type='file'
            accept='image/*'
            capture='environment'
            multiple
            onChange={(event) => handlePhotoCapture(event.target.files)}
            className='mt-2 w-full rounded border border-slate-300 px-2 py-1 text-xs'
          />
          <ul className='mt-2 space-y-1 text-xs text-slate-700'>
            {capturedPhotos.slice(0, 3).map((photo) => (
              <li key={photo} className='rounded bg-slate-50 px-2 py-1'>
                {photo}
              </li>
            ))}
          </ul>
        </section>

        <div className='mt-4 flex gap-2'>
          <button
            type='button'
            onClick={handleStepAction}
            className='flex-1 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'
          >
            {currentStep.actionLabel}
          </button>
          <button
            type='button'
            onClick={handleAiAssist}
            className='rounded-md border border-blue-700 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50'
          >
            Ask AI Copilot
          </button>
        </div>
      </article>

      <section className='rounded-lg border border-blue-300 bg-blue-50 p-3'>
        <p className='text-sm font-semibold text-blue-950'>Recent activity</p>
        <ul className='mt-2 space-y-2 text-xs text-blue-900'>
          {activityLog.slice(0, 4).map((entry) => (
            <li key={entry} className='rounded border border-blue-200 bg-white px-2 py-1'>
              {entry}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

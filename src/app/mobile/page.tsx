'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface PainterStep {
  readonly title: string;
  readonly objective: string;
  readonly aiHint: string;
  readonly actionLabel: string;
}

const PAINTER_STEPS: readonly PainterStep[] = [
  {
    title: '1. Receive & Start Job',
    objective: 'Confirm assignment, ETA, and onsite readiness.',
    aiHint: 'AI checks traffic/route and suggests a better arrival window.',
    actionLabel: 'Confirm start',
  },
  {
    title: '2. Quote + Variation + Materials',
    objective: 'Capture scope and estimate paint/material requirements.',
    aiHint: 'AI pre-fills quantities and flags likely under-estimation risks.',
    actionLabel: 'Submit quote/variation',
  },
  {
    title: '3. Execute + Time/Expense Tracking',
    objective: 'Track work progress, labor time, and expense uploads.',
    aiHint: 'AI validates missing entries and proposes next best task.',
    actionLabel: 'Log work update',
  },
  {
    title: '4. Complete & Submit Closeout',
    objective: 'Finalize work evidence and closeout packet for HQ.',
    aiHint: 'AI summarizes completed scope, exceptions, and invoice readiness.',
    actionLabel: 'Submit closeout',
  },
];

function getInitialFormState(): Record<string, string> {
  return {
    jobId: 'PP-2026-114',
    clientSite: '52 Harbour View Road',
    areaM2: '180',
    paintType: 'Low-VOC interior satin',
    materialsPurchased: 'Primer 40L, Topcoat 55L, masking tape 12 rolls',
    variationReason: '',
    hoursToday: '7.5',
    expensesToday: '45',
  };
}

export default function MobilePage(): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<string[]>(['In progress', 'Pending', 'Pending', 'Pending']);
  const [formState, setFormState] = useState<Record<string, string>>(getInitialFormState);
  const [activityLog, setActivityLog] = useState<string[]>(['Mobile route loaded']);

  const currentStep = PAINTER_STEPS[activeStep];
  const progress = useMemo(() => ((activeStep + 1) / PAINTER_STEPS.length) * 100, [activeStep]);

  const logAction = (message: string): void => {
    setActivityLog((previous) => [`${new Date().toLocaleTimeString()} - ${message}`, ...previous].slice(0, 8));
  };

  const handleInputChange = (key: string, value: string): void => {
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
  };

  const handleAiAssist = (): void => {
    logAction(`AI assist used for "${currentStep.title}"`);
  };

  return (
    <main className='mx-auto flex min-h-screen max-w-6xl flex-col gap-4 p-4 md:p-6'>
      <header className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-300 bg-white p-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-blue-700'>Painter Route</p>
          <h1 className='text-2xl font-bold text-slate-900'>/mobile</h1>
        </div>
        <div className='flex gap-2'>
          <Link href='/' className='rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100'>
            Home
          </Link>
          <Link href='/hq' className='rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800'>
            Go to HQ
          </Link>
        </div>
      </header>

      <section className='rounded-lg border border-slate-300 bg-white p-4'>
        <div className='mb-2 flex items-center justify-between text-sm'>
          <span className='font-medium text-slate-700'>4-step painter workflow progress</span>
          <span className='font-semibold text-blue-700'>{Math.round(progress)}%</span>
        </div>
        <div className='h-2 w-full rounded bg-slate-200'>
          <div className='h-2 rounded bg-blue-600 transition-all' style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1.5fr_1fr]'>
        <article className='rounded-lg border border-slate-300 bg-white p-4'>
          <div className='mb-4 grid gap-2 md:grid-cols-2'>
            {PAINTER_STEPS.map((step, index) => (
              <button
                key={step.title}
                type='button'
                onClick={() => setActiveStep(index)}
                className={`rounded-md border px-3 py-2 text-left text-sm ${
                  activeStep === index
                    ? 'border-blue-600 bg-blue-50 font-semibold text-blue-900'
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

          <div className='mt-4 grid gap-3 md:grid-cols-2'>
            {Object.entries(formState).map(([key, value]) => (
              <label key={key} className='text-sm text-slate-700'>
                <span className='mb-1 block font-medium capitalize'>{key.replaceAll(/([A-Z])/g, ' $1')}</span>
                <input
                  value={value}
                  onChange={(event) => handleInputChange(key, event.target.value)}
                  className='w-full rounded-md border border-slate-300 px-3 py-2'
                />
              </label>
            ))}
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={handleStepAction}
              className='rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'
            >
              {currentStep.actionLabel}
            </button>
            <button
              type='button'
              onClick={handleAiAssist}
              className='rounded-md border border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50'
            >
              Ask AI Copilot
            </button>
          </div>
        </article>

        <aside className='rounded-lg border border-blue-300 bg-blue-50 p-4'>
          <h3 className='text-lg font-semibold text-blue-950'>AI guidance for this step</h3>
          <p className='mt-2 text-sm text-blue-900'>{currentStep.aiHint}</p>
          <p className='mt-4 text-sm font-medium text-blue-950'>Recent activity</p>
          <ul className='mt-2 space-y-2 text-xs text-blue-900'>
            {activityLog.map((entry) => (
              <li key={entry} className='rounded border border-blue-200 bg-white px-2 py-1'>
                {entry}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}

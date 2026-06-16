'use client';

import Link from 'next/link';

export function HomeClient(): JSX.Element {
  return (
    <main className='mx-auto flex min-h-screen max-w-5xl flex-col gap-6 p-6'>
      <header className='rounded-lg border border-slate-300 bg-white p-6 shadow-sm'>
        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
          Precise Painting
        </p>
        <h1 className='mt-2 text-3xl font-bold text-slate-900'>
          Field + HQ Operations Platform
        </h1>
        <p className='mt-2 text-sm text-slate-600'>
          Two route experiences with AI assistance at every step.
        </p>
      </header>

      <section className='grid gap-4 md:grid-cols-2'>
        <article className='rounded-lg border border-blue-300 bg-blue-50 p-5'>
          <h2 className='text-xl font-semibold text-blue-950'>Painter Mobile Route</h2>
          <p className='mt-2 text-sm text-blue-900'>
            4-step execution flow for onsite quoting, variations, time/expense logging, and
            completion.
          </p>
          <Link
            href='/mobile'
            className='mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'
          >
            Open /mobile
          </Link>
        </article>

        <article className='rounded-lg border border-emerald-300 bg-emerald-50 p-5'>
          <h2 className='text-xl font-semibold text-emerald-950'>HQ Desktop/iPad Route</h2>
          <p className='mt-2 text-sm text-emerald-900'>
            4-step operations command center for dispatch, monitoring 50 painters, payroll, and
            invoicing.
          </p>
          <Link
            href='/hq'
            className='mt-4 inline-flex rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800'
          >
            Open /hq
          </Link>
        </article>
      </section>
    </main>
  );
}

import { NextResponse } from 'next/server';
import type { Job } from '@/jobdata/job';

const GIST_SCRIPT_URL = 'https://gist.github.com/letsdothis2003/5db6dbb14f1cea13818e137e3aabd0f7.js';

function isSafeJobsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === 'gist.github.com' || url.hostname === 'gist.githubusercontent.com' || url.hostname === 'raw.githubusercontent.com') && /\/raw\/[^/]+\/jobs\.json$/i.test(url.pathname);
  } catch {
    return false;
  }
}

function isJob(value: unknown): value is Job {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.company === 'string' &&
    typeof candidate.department === 'string' &&
    typeof candidate.location === 'string' &&
    typeof candidate.type === 'string' &&
    typeof candidate.salary === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.postedAt === 'string' &&
    Array.isArray(candidate.requirements) &&
    candidate.requirements.every((item) => typeof item === 'string') &&
    Array.isArray(candidate.benefits) &&
    candidate.benefits.every((item) => typeof item === 'string')
  );
}

export async function GET() {
  try {
    const scriptResponse = await fetch(GIST_SCRIPT_URL, {
      headers: { Accept: 'application/javascript' },
      next: { revalidate: 0 },
    });

    if (!scriptResponse.ok) {
      throw new Error(`Unable to load gist script (${scriptResponse.status})`);
    }

    const scriptText = await scriptResponse.text();
    const jobsUrlMatch = scriptText.match(/https:\/\/[^"'\s]+\/raw\/[^"'\s]+\/jobs\.json/i);

    if (!jobsUrlMatch?.[0] || !isSafeJobsUrl(jobsUrlMatch[0])) {
      throw new Error('The gist source did not expose a safe jobs URL.');
    }

    const jobsResponse = await fetch(jobsUrlMatch[0], {
      headers: { Accept: 'application/json' },
      next: { revalidate: 0 },
    });

    if (!jobsResponse.ok) {
      throw new Error(`Unable to load job data (${jobsResponse.status})`);
    }

    const payload = await jobsResponse.json();

    if (!Array.isArray(payload) || !payload.every(isJob)) {
      throw new Error('The job payload did not match the expected shape.');
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Unable to load jobs from gist source:', error);
    return NextResponse.json(
      { error: 'We could not load the current openings. Please refresh and try again.' },
      { status: 502 },
    );
  }
}

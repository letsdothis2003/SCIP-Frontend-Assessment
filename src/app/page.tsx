'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FilterState, Job } from '@/jobdata/job';
import { JobFilters } from '@/listing/JobFilters';
import { JobList } from '@/listing/JobList';
import companyLogo from './SCIP Logo.png';

const DEFAULT_GIST_URL = process.env.NEXT_PUBLIC_GIST_URL || 'https://gist.github.com/letsdothis2003/5db6dbb14f1cea13818e137e3aabd0f7';
const DEFAULT_FILTERS: FilterState = { searchQuery: '', department: '', location: '', type: '' };

const extractGistId = (sourceUrl: string): string | null => {
  try {
    const parsedUrl = new URL(sourceUrl);
    const pathname = parsedUrl.pathname;
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === 'api.github.com') {
      const match = pathname.match(/\/gists\/([a-f0-9]{7,40})(?:\/|$)/i);
      return match?.[1] ?? null;
    }

    if (hostname === 'gist.github.com') {
      const match = pathname.match(/\/[^/]+\/([a-f0-9]{7,40})(?:\/|$)/i);
      return match?.[1] ?? null;
    }

    if (hostname === 'gist.githubusercontent.com') {
      const match = pathname.match(/\/([a-f0-9]{7,40})(?:\/|$)/i);
      return match?.[1] ?? null;
    }
  } catch {
    // Fall back to a regex-based parse below.
  }

  const fallbackMatch = sourceUrl.match(/(?:gist\.github\.com\/[^/]+\/|gist\.github\.com\/|gists\/)([a-f0-9]{7,40})(?:\/|$)/i);
  return fallbackMatch?.[1] ?? null;
};

const getGistApiUrl = (sourceUrl: string): string => {
  const gistId = extractGistId(sourceUrl);

  if (!gistId) {
    throw new Error('Please provide a valid GitHub gist URL.');
  }

  return `https://api.github.com/gists/${gistId}`;
};

export default function Home() {
  // The main data state for this page.
  // jobs hold the full list, filters track the active filter values,
  // isLoading tracks whether the page is still fetching data,
  // and error holds a friendly error message if fetching fails.
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const queryGistUrl =
          typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('gistUrl')
            : null;

        const sourceUrl = queryGistUrl?.trim() || DEFAULT_GIST_URL;
        const gistApiUrl = getGistApiUrl(sourceUrl);

        // Step 1: Fetch Gist metadata
        const gistResponse = await fetch(gistApiUrl, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });
        if (!gistResponse.ok) {
          throw new Error(`Gist API request failed with status ${gistResponse.status}`);
        }
        const gistData = await gistResponse.json();

        const files = gistData.files;
        const fileNames = Object.keys(files || {});
        let jsonFileName = fileNames.find((name) => name.endsWith('.json'));

        if (!jsonFileName) {
          jsonFileName = fileNames[0];
        }

        if (!jsonFileName) {
          throw new Error('No files found in the Gist.');
        }

        const file = files[jsonFileName];
        const rawUrl = file?.raw_url;

        if (!rawUrl) {
          throw new Error('The selected gist does not expose a raw JSON file.');
        }

        // Step 2: Fetch the raw content of the JSON file
        const jobsResponse = await fetch(rawUrl);
        if (!jobsResponse.ok) {
          throw new Error(`Failed to fetch job data: ${jobsResponse.status}`);
        }

        const payload = await jobsResponse.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.jobs)
            ? payload.jobs
            : null;

        if (!Array.isArray(data)) {
          throw new Error('The gist JSON must resolve to a jobs array.');
        }

        if (isMounted) {
          setJobs(data);
        }
      } catch (err) {
        console.error('Unable to load jobs:', err);
        if (isMounted) {
          setError('We could not load the current openings. Please refresh and try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Build the filter choices from the loaded jobs.
  // That way the dropdown values always match available data.
  const { departments, locations, types } = useMemo(() => {
    return {
      departments: Array.from(new Set(jobs.map((job) => job.department))).sort(),
      locations: Array.from(new Set(jobs.map((job) => job.location))).sort(),
      types: Array.from(new Set(jobs.map((job) => job.type))).sort(),
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesQuery = !query || job.title.toLowerCase().includes(query);
      const matchesDepartment = !filters.department || job.department === filters.department;
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesType = !filters.type || job.type === filters.type;

      return matchesQuery && matchesDepartment && matchesLocation && matchesType;
    });
  }, [jobs, filters]);

  const handleResetFilters = () => {
    // Put everything back to the default empty state.
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Added a grid texture because the plain white looked boring */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-slate-100">
        {/* This is a placeholder for now*/}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 flex flex-col items-center text-center">
          
          {/* Centered Logo - Height expanded to h-64 to let the width grow larger */}
          <div className="mb-8 w-full flex justify-center">
            <Image 
              src={companyLogo} 
              alt="SCIP logo" 
              width={600} 
              height={180} 
              className="h-64 w-auto object-contain" 
              priority
            />
          </div>

          {/* Blue Highlight for banner */}
          <div className="w-full max-w-3xl bg-sky-800 text-white rounded-2xl p-8 md:p-10 shadow-lg border border-sky-700/50">
            {/* Bolded & Underlined Careers so people can see it better */}
            <h1 className="text-3xl font-extrabold tracking-widest uppercase mb-6 underline decoration-sky-300 decoration-4 underline-offset-8">
              Careers
            </h1>
            <p className="text-lg sm:text-xl font-medium leading-relaxed text-white/95">
              Discover roles across SCIP as everyone has a chance to be a global leader!
            </p>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:px-8">
        <JobFilters
          filters={filters}
          onFilterChange={setFilters}
          departments={departments}
          locations={locations}
          types={types}
          onReset={handleResetFilters}
        />

        {error ? (
          <div className="rounded-2xl border border-black/10 bg-black/5 p-6 text-center text-black">
            <h2 className="text-lg font-semibold">We could not load these listings</h2>
            <p className="mt-2 text-sm text-black/70">{error}</p>
          </div>
        ) : (
          <JobList jobs={filteredJobs} isLoading={isLoading} />
        )}
      </main>

      {/* Footer */}
      <footer className="footer-brand bg-sky-900 px-6 py-8 text-center text-sm text-white mt-12">
        <p>© {new Date().getFullYear()} SCIP. All rights reserved.</p>
      </footer>
    </div>
  );
}

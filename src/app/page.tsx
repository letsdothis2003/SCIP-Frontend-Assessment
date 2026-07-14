'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FilterState, Job } from '@/jobdata/job';
import { JobFilters } from '@/listing/JobFilters';
import { JobList } from '@/listing/JobList';
import companyLogo from './SCIP Logo.png';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  department: '',
  location: '',
  type: '',
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
    // Load the job data once on first render.
    // This keeps the page dynamic while still using a simple JSON file.
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/data/jobs.json');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as Job[];
        setJobs(data);
      } catch (err) {
        console.error('Unable to load jobs:', err);
        setError('We could not load the current openings. Please refresh and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Build the filter choices from the loaded jobs.
  // That way the dropdown values always match available data.
  const departments = useMemo(() => Array.from(new Set(jobs.map((job) => job.department))).sort(), [jobs]);
  const locations = useMemo(() => Array.from(new Set(jobs.map((job) => job.location))).sort(), [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs.map((job) => job.type))).sort(), [jobs]);

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
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-end">
            <div className="lg:col-span-2">
              <div className="hero-logo-wrap mb-2">
                <Image src={companyLogo} alt="SCIP logo" width={340} height={110} className="h-24 w-auto object-contain" />
                <span className="badge-careers">Careers</span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                <span className="text-sky-800">Find work that moves you forward</span>.
              </h1>
              <p className="mt-4 text-lg text-black/70">
                Discover roles across SCIP. Everyone has a change to be a Global Leader!
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="brand-blue-panel">
                <p className="text-sm text-white/90">Currently hiring</p>
                <p className="mt-1 text-2xl font-semibold text-white">{jobs.length} openings</p>
                <p className="mt-2 text-sm text-white/90">Remote &amp; on-site roles</p>
              </div>
            </div>
          </div>
        </div>
      </header>

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

      <footer className="footer-brand px-6 py-8 text-center text-sm text-white">
        <p>© {new Date().getFullYear()} SCIP. All rights reserved.</p>
      </footer>
    </div>
  );
}

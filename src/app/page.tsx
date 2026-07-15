'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FilterState, Job } from '@/listing/job';
import { JobFilters } from '@/listing/JobFilters';
import { JobList } from '@/listing/JobList';
import companyLogo from './SCIP Logo.png';
import { CONFIG } from '@/config';

const DEFAULT_FILTERS: FilterState = { searchQuery: '', department: '', location: '', type: '' };

export default function Home() {
  // This is just the main UI for the job filter this page.
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

        // Step 1: Fetch Gist metadata
        const gistResponse = await fetch(CONFIG.GIST_API_URL, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });
        if (!gistResponse.ok) {
          throw new Error(`Gist API request failed with status ${gistResponse.status}`);
        }
        const gistData = await gistResponse.json();

        // Find the first file that ends with .json, or fallback to the first file
        const files = gistData.files;
        const fileNames = Object.keys(files);
        let jsonFileName = fileNames.find((name) => name.endsWith('.json'));
        if (!jsonFileName) {
          // If no .json file, use the first file (assume it's JSON)
          jsonFileName = fileNames[0];
        }
        if (!jsonFileName) {
          throw new Error('No files found in the Gist.');
        }

        const file = files[jsonFileName];
        const rawUrl = file.raw_url;

        // Step 2: Fetch the raw content of the JSON file
        const jobsResponse = await fetch(rawUrl);
        if (!jobsResponse.ok) {
          throw new Error(`Failed to fetch job data: ${jobsResponse.status}`);
        }
        const data = (await jobsResponse.json()) as Job[];

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
    // Put everything back to the default empty state for clear filter buton.
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-white text-black font-['Inter',_system-ui,_-apple-system,_sans-serif]">
      {/* Added a grid texture because the plain white looked boring */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-slate-100">
        {/* This is a placeholder for now, you can replace the grid texture with an image*/}
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
          
          {/* Logo, kept it large and centered based on my preference */}
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
            <h1 className="text-3xl font-light tracking-[0.3em] uppercase mb-6 underline decoration-sky-300 decoration-4 underline-offset-8">
              Careers
            </h1>
            <p className="text-lg sm:text-xl font-light leading-relaxed text-white/95 tracking-wide">
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
      <footer className="footer-brand bg-sky-900 px-6 py-8 text-center text-sm text-white mt-12 font-light tracking-wide">
        <p>© {new Date().getFullYear()} SCIP. All rights reserved.</p>
      </footer>
    </div>
  );
}
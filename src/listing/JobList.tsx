'use client';

import React from 'react';
import { Job } from '@/jobdata/job';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
}

export const JobList: React.FC<JobListProps> = ({ jobs, isLoading }) => {
  if (isLoading) {
    // While the job data is loading, show a few lightweight placeholder cards.
    return (
      <div className="space-y-4" data-testid="job-list-loading">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-2xl border border-black/10 bg-black/5 p-6">
            <div className="h-3 w-24 rounded bg-black/20" />
            <div className="mt-3 h-6 w-2/3 rounded bg-black/20" />
            <div className="mt-4 h-4 w-full rounded bg-black/10" />
            <div className="mt-2 h-4 w-5/6 rounded bg-black/10" />
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    // If there are no jobs after filtering, tell the user what to do next.
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-black/5 px-6 py-12 text-center" data-testid="job-list-empty">
        <h3 className="text-lg font-semibold text-black">No Job Openings Found</h3>
        <p className="mt-2 text-sm text-black/70">
          Try broadening your search or clearing a filter to see more opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5" data-testid="job-list-grid">
      <div className="text-sm text-black/70">
        Showing {jobs.length} {jobs.length === 1 ? 'opening' : 'openings'}
      </div>
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { Job } from '@/jobdata/job';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Tracks whether the detail panel is open or collapsed.
  const [isExpanded, setIsExpanded] = useState(false);

  const formatFriendlyDate = (dateString: string) => {
    // Convert a raw ISO date into a readable date label.
    // If the date is invalid, just fall back to the original text.
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const typeBadgeStyles = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] bg-rose-600 text-white border border-rose-700';

  return (
    <article className="brand-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-black/60">
            <span>{job.company}</span>
            <span className="text-black/40">•</span>
            <span>{formatFriendlyDate(job.postedAt)}</span>
          </div>

          <h3 className="text-xl font-semibold text-black">{job.title}</h3>

          <div className="flex flex-wrap items-center gap-2 text-sm muted">
            <span className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-sky-800">{job.department}</span>
            <span className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-sky-800">{job.location}</span>
            <span className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-sky-800">{job.salary}</span>
          </div>
        </div>

        <span className={typeBadgeStyles}>
          {job.type}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 muted">{job.description}</p>

      <div className={`overflow-hidden ${isExpanded ? 'mt-6 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {isExpanded && (
          <div className="grid gap-6 border-t border-black/10 pt-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-black">Requirements</h4>
              <ul className="mt-3 space-y-2 text-sm muted">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-800" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-black">Benefits</h4>
              <ul className="mt-3 space-y-2 text-sm muted">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-600" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                className="cta-red-button"
                onClick={() => window.location.href = `mailto:careers@northstar.example?subject=Application%20for%20${encodeURIComponent(job.title)}`}
              >
                Apply now
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="cta-red-button"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide details' : 'View details'}
        </button>
      </div>
    </article>
  );
};

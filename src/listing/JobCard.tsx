'use client';

import { useState, useMemo } from 'react';
import { Job } from '@/jobdata/job';

interface JobCardProps {
  job: Job;
}

// Helper function extracted outside the component to prevent recreation on every render cycle
const formatFriendlyDate = (dateString: string): string => {
  try {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) return dateString;
    
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize formatted date so it only recalculates when job.postedAt changes
  const formattedDate = useMemo(() => formatFriendlyDate(job.postedAt), [job.postedAt]);

  // Safe browser-only email dispatch pointing to scipleaders111@gmail.com
  const handleApplyClick = () => {
    if (typeof window !== 'undefined') {
      const subject = encodeURIComponent(`Application for ${job.title}`);
      window.location.href = `mailto:scipleaders111@gmail.com?subject=${subject}`;
    }
  };

  return (
    <article className="brand-card p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Upper Info Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>{job.company}</span>
            <span className="text-slate-300">•</span>
            <span>{formattedDate}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mt-2">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-800">{job.department}</span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-800">{job.location}</span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-800">{job.salary}</span>
          </div>
        </div>

        {/* Job Type Pill Badge */}
        <span className="self-start inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-rose-600 text-white border border-rose-700">
          {job.type}
        </span>
      </div>

      {/* Main Pitch */}
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{job.description}</p>

      {/* Collapsible details container with dynamic height transitions */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'mt-6 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-2">
          
          {/* Requirements column */}
          <div>
            <h4 className="text-sm font-bold text-slate-900">Requirements</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600">
              {job.requirements.map((requirement, index) => (
                <li key={`req-${index}`} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-800" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits column */}
          <div>
            <h4 className="text-sm font-bold text-slate-900">Benefits</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600">
              {job.benefits.map((benefit, index) => (
                <li key={`ben-${index}`} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call To Action Row */}
          <div className="md:col-span-2 flex justify-end pt-4">
            <button
              type="button"
              className="cta-red-button px-6 py-2.5 bg-rose-600 text-white font-bold rounded-xl shadow hover:bg-rose-700 transition"
              onClick={handleApplyClick}
            >
              Apply now
            </button>
          </div>
        </div>
      </div>

      {/* Action Toggle Switch */}
      <div className="mt-6 flex justify-center border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="rounded-xl border border-rose-600 bg-rose-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide details' : 'View details'}
        </button>
      </div>
    </article>
  );
};
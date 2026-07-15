/*This is an attempt at a job search and filer */

import React from 'react';
import { FilterState } from '@/listing/job';

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  departments: string[];
  locations: string[];
  types: string[];
  onReset: () => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFilterChange,
  departments,
  locations,
  types,
  onReset,
}) => {
  // Update the search term while keeping the existing select filters.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: event.target.value,
    });
  };

  // Update one select field at a time.
  const handleSelectChange = (key: keyof Omit<FilterState, 'searchQuery'>, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  // Checks if any filter is actively set so we know when to show the clear button.
  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.department !== '' ||
    filters.location !== '' ||
    filters.type !== '';

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search input field */}
        <div className="flex-1">
          <label htmlFor="job-search-input" className="mb-2 block text-sm font-medium text-black">
            Search roles
          </label>
          <input
            id="job-search-input"
            type="text"
            className="form-control"
            placeholder="Search by job title or keyword"
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filter dropdowns */}
        <div className="grid flex-1 gap-4 md:grid-cols-3">
          {/* Department filter */}
          <div>
            <label htmlFor="filter-department" className="mb-2 block text-sm font-medium text-black">
              Department
            </label>
            <select
              id="filter-department"
              className="form-select"
              value={filters.department}
              onChange={(event) => handleSelectChange('department', event.target.value)}
            >
              <option value="">All departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* Location filter */}
          <div>
            <label htmlFor="filter-location" className="mb-2 block text-sm font-medium text-black">
              Location
            </label>
            <select
              id="filter-location"
              className="form-select"
              value={filters.location}
              onChange={(event) => handleSelectChange('location', event.target.value)}
            >
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Job type filter */}
          <div>
            <label htmlFor="filter-type" className="mb-2 block text-sm font-medium text-black">
              Job type
            </label>
            <select
              id="filter-type"
              className="form-select"
              value={filters.type}
              onChange={(event) => handleSelectChange('type', event.target.value)}
            >
              <option value="">All types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clear button appears only when at least one filter is active */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="filter-clear-button"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
};
/**
 * Represents the structure of a single job opening in the system.
 */
export interface Job {
  /** Unique identifier for the job post (job or application id) */
  id: string;
  /** Title of the job position */
  title: string;
  /** The name of the hiring company */
  company: string;
  /** The department/division*/
  department: string;
  /** The location details*/
  location: string;
  /** The employment agreement type */
  type: string;
  /** The salary range offered */
  salary: string;
  /** A brief summary of the role and expectations */
  description: string;
  /** The publication date of the listing in YYYY-MM-DD format */
  postedAt: string;
  /** List of key requirements or qualifications for the applicant */
  requirements: string[];
  /** List of employee benefits and perks associated with the job */
  benefits: string[];
}

/**
 * Represents the active filtering state of the job board search interface.
 */
export interface FilterState {
  /** For search against job titles */
  searchQuery: string;
  /**Search for department; empty string indicates 'All' */
  department: string;
  /**Search for location; empty string indicates 'All' */
  location: string;
  /** Filter selection for employment type; empty string indicates 'All' */
  type: string;
}

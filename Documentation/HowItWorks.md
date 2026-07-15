This is explaining what each file does
---

## Directory & File Structure

### `/app` Directory

* **`SCIP Logo.png`**: CAN'T FIND A BETTER QUALITY ONE
* **`globals.css`**: Uses Tailwind CSS and defining custom utility classes using `@apply`. This helps with our site visuals 
* **`layout.tsx`**: The index that structures the default page.
* **`page.tsx`**: The main controller component that handles state management, API data fetching with out GISTand contains our page elements.

### `/listing` Directory

* **`JobCard.tsx`**: Renders individual job post details and manages local UI state to toggle the visibility of requirements and benefits.
* **`JobFilters.tsx`**: Houses the search and filter selections.
* **`JobList.tsx`**: A container that handles mapping the filtered jobs attributes into job card components.
* **`job.ts`**: The TypeScript definition file for job listings and their attributes.

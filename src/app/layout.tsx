/*This would normally be the index file. I thought this name was more easier to understand. It usess app router for clean routing and layout structure.*/

import "./globals.css";

export const metadata = {
  title: "Careers & Job Openings Board",
  description: "Explore our open job listings across all of our teams. Apply now to become a Global Leader!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* This layout wraps every page in the app and loads global styles. */}
        {/* It keeps the shell simple so each page can render with proper format. Without it, our site will look very ugly and disorganized as our padding is removed. */}
        {/* The RootLayout follows App Router conventions for a clean, maintainable component structure. */}
        {children}
      </body>
    </html>
  );
}
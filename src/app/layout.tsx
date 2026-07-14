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
        {/* It keeps the shell simple so each page can render without extra noise. */}
        {children}
      </body>
    </html>
  );
}
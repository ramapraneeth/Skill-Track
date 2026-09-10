import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SKILLBRIDGE AI — Connecting Skills, Education, Industry and Employment',
  description: 'National Digital Skill Intelligence Platform connecting Students, Trainers, Courses, Skills, Certifications, and Employment Outcomes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F5F9FD] text-[#0B2D4F] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}

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
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#102A43] antialiased">
        {children}
      </body>
    </html>
  );
}

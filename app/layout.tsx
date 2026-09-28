import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ConnectPurpose — Authentic Purpose-Driven Network',
  description: 'Authentication module for ConnectPurpose platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F9FC] text-[#182230] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

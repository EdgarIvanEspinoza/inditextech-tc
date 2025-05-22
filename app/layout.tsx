import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Edgar Ivan Espinoza',
  description: 'Inditextech Technical Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

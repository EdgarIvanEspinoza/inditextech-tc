import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header/Header';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

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
      <body className={`${roboto.variable} antialiased`}>
        <main className="min-h-screen w-full bg-background">
          <TooltipProvider>
            <Header />
            {children}
          </TooltipProvider>
        </main>
      </body>
    </html>
  );
}

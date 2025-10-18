import type { Metadata } from 'next';
import './globals.css';
import ProviderWrapper from './provider';
import { Toaster } from '../components/ui/toaster';

export const metadata: Metadata = {
  title: 'Product Management',
  description: 'A simple Product Management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProviderWrapper>
          {children}
          <Toaster />
        </ProviderWrapper>
      </body>
    </html>
  );
}

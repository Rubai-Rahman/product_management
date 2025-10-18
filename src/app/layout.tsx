import type { Metadata } from 'next';
import './globals.css';
import ProviderWrapper from './provider';

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
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

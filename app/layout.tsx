import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ searchParams }: { searchParams: { title?: string } }) {
  const title = searchParams ? searchParams.title : 'Vad finns här';
  const description = 'Kolla vad för roligt som finns här!';

  return {
    title,
    description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
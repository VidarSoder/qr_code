'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const [pageTitle, setPageTitle] = useState("Vad finns i lådan");

  useEffect(() => {
    const title = searchParams.get("title");
    if (title) {
      console.log(title, 'title?');
      setPageTitle(title);
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Kolla vad för roligt som finns här!");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Kolla vad för roligt som finns här!";
      document.head.appendChild(meta);
    }
  }, [pageTitle]);

  return (
    <html lang="en">
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kolla vad för roligt som finns här!" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

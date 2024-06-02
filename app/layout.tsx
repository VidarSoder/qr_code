'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import Head from "next/head";
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
      setPageTitle(title);
    }
  }, [searchParams]);

  return (
    <html lang="en">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kolla vad för roligt som finns här!" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

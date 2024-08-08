import React from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: {
    template: '%s | Hive',
    default: 'Hive',
  },
  description:
    'Hive is a social app for community engagement with profiles, communities , buzzes, search, and activity feeds. Built with Next.js, MongoDB, and Clerk.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-auth`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

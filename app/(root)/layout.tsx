import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { dark } from '@clerk/themes';
import { Analytics } from '@vercel/analytics/react';

import '../globals.css';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';
import RightSidebar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';

export const metadata: Metadata = {
  title: {
    template: '%s | Hive',
    default: 'Hive',
  },
  description:
    'Hive is a social app for community engagement with profiles, communities , buzzes, search, and activity feeds. Built with Next.js, MongoDB, and Clerk.',
};
const inter = Inter({ subsets: ['latin'] });
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
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
      <Analytics />
    </ClerkProvider>
  );
}

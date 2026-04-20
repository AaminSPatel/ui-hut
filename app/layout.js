import { Syne, DM_Sans } from 'next/font/google';
import { SiteProvider } from '@/context/SiteContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400','500','600','700','800'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm', weight: ['300','400','500','600'] });

export const metadata = {
  title: 'UI Hut - Premium UI Components Marketplace',
  description: 'Buy production-ready React & Next.js components. Save hundreds of dev hours with our curated UI library.',
  keywords: 'UI components, React, Next.js, Tailwind CSS, component marketplace',
  authors: [{ name: 'UI Hut' }],
  openGraph: {
    title: 'UI Hut - Premium UI Components',
    description: 'Production-ready UI components for modern web development',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable}`}>
        <SiteProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </SiteProvider>
      </body>
    </html>
  );
}
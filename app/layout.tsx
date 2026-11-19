import type { Metadata } from 'next';
import './globals.css';
import { SiteProvider } from '@/context/SiteContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'NEXGEN WORKFORCE SERVICES | Build People, Build Success',
  description:
    'Premier manpower supply, skilled workforce, housekeeping, technical technicians, and driver services based in Gujarat, India.',
  icons: {
    icon: '/logo/logologo.jpeg',
    shortcut: '/logo/logologo.jpeg',
    apple: '/logo/logologo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logologo.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo/logologo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo/logologo.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#F4F8FC] selection:bg-brand-orange selection:text-white">
        <AuthProvider>
          <SiteProvider>
            {children}
            <Toaster position="top-right" richColors />
          </SiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

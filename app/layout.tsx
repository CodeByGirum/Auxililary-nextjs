import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import ClientLayout from '@/components/ClientLayout';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
    title: 'SnowUI Dashboard',
    description: 'AI-Powered Dashboard',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
                {/* PrismJS Scripts - Optimized loading */}
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js" strategy="lazyOnload" />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js" strategy="lazyOnload" />

                {/* Pyodide & AlaSQL */}
                <Script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" strategy="lazyOnload" />
                <Script src="https://cdn.jsdelivr.net/npm/alasql@4" strategy="lazyOnload" />

                <Providers>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </Providers>
            </body>
        </html>
    );
}

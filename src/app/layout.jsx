import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin']
});

export const metadata = {
    title: 'Schools Manager',
    description:
        'App to manage schools information powered by Next.js + MySQL + Supabase + Vercel'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}

import './globals.css'
import { Inter } from 'next/font/google'
import AuthContextProvider from '@/context/AuthCtx';
import Sidebar from '@/components/UIComponents/Sidebar';
const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Image App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}

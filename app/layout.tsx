import type { Metadata } from 'next'
import { Html } from "next/document"
import Link from 'next/link';

import './globals.css'
import BlobTank from './components/BlobTank';
import Navbar from "./components/Navbar"
import BlobTankNetwork from './components/BlobTankNetwork';

export const metadata: Metadata = {
  title: 'Bennett Martin Creative Solutions',
  description: 'Created by Bennett Martin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
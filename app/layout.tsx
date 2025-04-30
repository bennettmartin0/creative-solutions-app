import { Html } from "next/document"
import Navbar from "./components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Navbar />
      <body>{children}</body>
    </html>
  )




}
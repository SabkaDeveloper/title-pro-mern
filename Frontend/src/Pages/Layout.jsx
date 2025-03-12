import { Inter } from "next/font/google"
import "./dashboard.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Charts Dashboard",
  description: "Orders by Product Type and State",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'
import './globals.css'
import 'react-quill/dist/quill.snow.css'
import Link from 'next/link'

export const metadata = {
  title: 'Krishna\'s Blog',
  description: 'Welcome to my personal blog where I share my thoughts and experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <nav className="nav">
              <Link href="/" className="logo">
                Krishna's Blog
              </Link>
              <div className="nav-links">
                <Link href="/" className="nav-link">
                  Home
                </Link>
                <Link href="/admin" className="nav-link">
                  Admin
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
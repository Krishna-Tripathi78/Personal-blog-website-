import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#dc2626' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  )
}
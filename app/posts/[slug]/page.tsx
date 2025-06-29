import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic';

async function getPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/posts/${slug}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.log('Failed to fetch post during build')
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  
  return {
    title: post.title,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    }
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article className="card">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
        {post.title}
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
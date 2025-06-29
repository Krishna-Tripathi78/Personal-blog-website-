import Link from 'next/link'

export const dynamic = 'force-dynamic';

// Function to get all blog posts
async function getAllPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/posts`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return []
    }
    
    return response.json()
  } catch (error) {
    console.log('Failed to fetch posts during build')
    return []
  }
}

// Home page component  
export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div>
      <h1 style={{marginBottom: '30px', fontSize: '2.5rem', fontWeight: 'bold'}}>
        Welcome to My Blog!
      </h1>
      
      {posts.length === 0 ? (
        <div className="card">
          <p>No blog posts yet! <Link href="/admin/create">Write your first post</Link></p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post: any) => (
            <div key={post._id} className="card">
              <h2 style={{marginBottom: '10px'}}>
                <Link 
                  href={`/posts/${post.slug}`}
                  style={{color: '#007bff', textDecoration: 'none'}}
                >
                  {post.title}
                </Link>
              </h2>
              <p style={{color: '#888', marginBottom: '15px', fontSize: '14px'}}>
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div 
                className="post-content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.substring(0, 150) + '...' 
                }}
              />
              <Link 
                href={`/posts/${post.slug}`}
                className="btn btn-primary"
                style={{marginTop: '15px'}}
              >
                Continue Reading
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Admin dashboard component
function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load posts when component mounts
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
    setLoading(false)
  }

  const handleDelete = async (slug) => {
    if (confirm('Delete this post?')) {
      await fetch(`/api/posts/${slug}`, {
        method: 'DELETE'
      })
      loadPosts() // Reload posts
    }
  }

  if (loading) return <div>Loading posts...</div>

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>Blog Dashboard</h1>
        <Link href="/admin/create" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card">
          <p>No blog posts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post._id} className="post-item">
              <div>
                <h3>{post.title}</h3>
                <p style={{color: '#777', fontSize: '14px'}}>
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="post-actions">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="btn"
                  style={{backgroundColor: '#28a745', color: 'white'}}
                >
                  View
                </Link>
                <Link 
                  href={`/admin/edit/${post.slug}`}
                  className="btn"
                  style={{backgroundColor: '#ffc107', color: 'black'}}
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(post.slug)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
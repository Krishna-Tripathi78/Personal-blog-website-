'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/RichTextEditor'
import slugify from 'slugify'

export default function EditPost({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  const newSlug = title ? slugify(title, { lower: true, strict: true }) : ''

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${params.slug}`)
      if (res.ok) {
        const post = await res.json()
        setTitle(post.title)
        setContent(post.content)
      } else {
        alert('Post not found')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Failed to fetch post')
      router.push('/admin')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/posts/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        alert('Failed to update post')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>
        Edit Post
      </h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            New Slug (Auto-generated)
          </label>
          <input
            type="text"
            value={newSlug}
            className="form-input"
            style={{ backgroundColor: '#f3f4f6', color: '#666' }}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Content
          </label>
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="btn"
            style={{ backgroundColor: '#6b7280', color: 'white' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
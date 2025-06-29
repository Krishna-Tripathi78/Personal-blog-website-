'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/RichTextEditor'
import slugify from 'slugify'

// Create new blog post page
function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Generate slug from title
  let slug = ''
  if (title) {
    slug = slugify(title, { lower: true, strict: true })
  }

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (title === '' || content === '') {
      alert('Please fill all fields!')
      return
    }

    setIsLoading(true)

    try {
      // Send data to API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title, 
          content: content 
        }),
      })

      if (response.ok) {
        // Success - go back to admin
        router.push('/admin')
      } else {
        const errorData = await response.json()
        alert('Error: ' + (errorData.error || 'Something went wrong!'))
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Network error! Check your connection.')
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 style={{fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold'}}>
        Add New Blog Post
      </h1>

      <form onSubmit={submitPost} className="card">
        <div className="form-group">
          <label>Post Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter your post title here..."
          />
        </div>

        <div className="form-group">
          <label>URL Slug:</label>
          <input
            type="text"
            value={slug}
            className="form-input"
            style={{backgroundColor: '#f5f5f5', color: '#888'}}
            disabled
          />
          <small style={{color: '#666'}}>This is auto-generated from your title</small>
        </div>

        <div className="form-group">
          <label>Post Content:</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="btn"
            style={{backgroundColor: '#999', color: 'white'}}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
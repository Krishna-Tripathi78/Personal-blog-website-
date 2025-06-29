# My Personal Blog Website

This is my blog project built with Next.js and MongoDB. I created this as part of my web development learning journey.

## Features

- ✅ Create, read, update, and delete blog posts
- ✅ Rich text editor with formatting options
- ✅ SEO-friendly URLs (slugs)
- ✅ MongoDB integration
- ✅ Dynamic meta tags for SEO
- ✅ Responsive design
- ✅ Admin dashboard

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up MongoDB

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `.env.local` with your connection string

### 3. Environment Variables

Update `.env.local` with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/blog-db?retryWrites=true&w=majority
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Admin Dashboard
- Visit `/admin` to access the admin dashboard
- Create new posts at `/admin/create`
- Edit existing posts from the admin dashboard
- Delete posts with confirmation

### Public Blog
- Home page shows all published posts
- Individual posts are accessible via `/posts/[slug]`
- SEO-optimized with dynamic meta tags

## API Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[slug]` - Get a specific post
- `PUT /api/posts/[slug]` - Update a post
- `DELETE /api/posts/[slug]` - Delete a post

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Rich Text Editor**: React Quill
- **Styling**: CSS Modules
- **Deployment**: Vercel (recommended)

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```
MONGODB_URI=your-production-mongodb-uri
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```
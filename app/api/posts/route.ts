import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    const slug = slugify(title, { lower: true, strict: true });
    
    const post = new Post({
      title,
      content,
      slug,
    });
    
    await post.save();
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post', details: error.message }, { status: 500 });
  }
}
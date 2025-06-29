import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const { title, content } = await request.json();
    
    const newSlug = slugify(title, { lower: true, strict: true });
    
    const post = await Post.findOneAndUpdate(
      { slug: params.slug },
      { title, content, slug: newSlug },
      { new: true }
    );
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOneAndDelete({ slug: params.slug });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
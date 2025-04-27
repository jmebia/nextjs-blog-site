import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// GET function to fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST function to create a new post
export async function POST(request: Request) {
  const { title, content } = await request.json();  // Expecting title and content in request body
  
  // Convert the Markdown content to HTML
  const htmlContent = await remark().use(remarkHtml).process(content);
  const htmlString = htmlContent.toString();
  
  // Save the post to the database
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,  
      },
    });
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

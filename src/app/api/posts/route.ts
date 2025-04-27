import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // custom helper located at /src/lib directory

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Always set loading to false
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!post) {
    return <div className="p-4">Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

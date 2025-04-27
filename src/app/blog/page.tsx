"use client";

import { useEffect, useState } from "react";
import { Post } from "@prisma/client"; // Import your Post type if you have it
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-6">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

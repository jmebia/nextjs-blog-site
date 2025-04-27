// /app/blog/create/page.tsx

"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the markdown editor to avoid SSR issues
const ReactMarkdownEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

// Import remark and the remark-html plugin for converting markdown to HTML
import {remark} from 'remark';
import remarkHtml from 'remark-html';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPostCreated, setIsPostCreated] = useState(false);

  // Handle markdown content change
  const handleEditorChange = (value: string) => {
    setContent(value || ''); // Make sure we handle null/undefined values gracefully
  };

  // Convert markdown to HTML using remark
  const convertMarkdownToHtml = (markdown: string) => {
    const result = remark().use(remarkHtml).processSync(markdown);
    return result.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const htmlContent = convertMarkdownToHtml(content); // Convert markdown to HTML before saving

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content: htmlContent }), // Send the HTML content
      });
      if (!res.ok) throw new Error('Failed to create post');
      setIsPostCreated(true);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>

      {/* Post creation form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        
        {/* Markdown editor for content */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Content (Markdown):</label>
          <ReactMarkdownEditor
            value={content}
            style={{ height: '400px' }}
            onChange={handleEditorChange}
          />
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>

      {isPostCreated && <p className="mt-4 text-green-500">New post created successfully!</p>}
    </div>
  );
}

import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
};

async function getPosts(): Promise<Post[]> {
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/posts`);
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
          >
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

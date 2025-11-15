import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserProfilePage(props: PageProps) {
  // ⬇️ This is the important line
  const { username } = await props.params;

  // If no username or literally "undefined" in the URL → 404
  if (!username || username === "undefined") {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center text-lg font-semibold">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-neutral-400">@{user.username}</p>
          <p className="text-xs text-neutral-500 mt-1">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-neutral-400">
        <span>{user.posts.length} posts</span>
        <Link href="/social" className="hover:text-neutral-200">
          ← Back to feed
        </Link>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {user.posts.length === 0 && (
          <p className="text-neutral-500 text-sm">
            This user hasn&apos;t posted anything yet.
          </p>
        )}

        {user.posts.map((post) => (
          <div
            key={post.id}
            className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/40"
          >
            <p className="text-neutral-200 whitespace-pre-line">
              {post.content}
            </p>
            <p className="text-xs text-neutral-500 mt-3">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
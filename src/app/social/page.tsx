import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

// ⭐ Server Action — Create a New Post
export async function createPost(formData: FormData) {
  "use server";

  const session = await getSession();

  // Cast session user to include ID safely
  const user = session?.user as
    | { id: string; name?: string | null; email?: string | null }
    | undefined;

  if (!user?.id) {
    throw new Error("You must be logged in to post.");
  }

  const raw = formData.get("content");
  const content = typeof raw === "string" ? raw.trim() : "";

  if (!content) return;

  await prisma.post.create({
    data: {
      content,
      authorId: Number(user.id),
    },
  });

  revalidatePath("/social");
  redirect("/social");
}

// ⭐ Social Feed Page (Server Component)
export default async function SocialPage() {
  const session = await getSession();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          username: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Social Feed</h1>

      {/* ⭐ Post form if logged in */}
      {session?.user ? (
        <form action={createPost} className="space-y-3 mb-8">
          <textarea
            name="content"
            placeholder="What's on your mind?"
            className="w-full h-24 p-3 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="mb-4 text-neutral-400">
          <Link href="/login" className="text-blue-400 underline">
            Log in
          </Link>{" "}
          to post.
        </p>
      )}

      {/* ⭐ Posts List */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/40"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-neutral-700 rounded-full" />
            <div>
              <p className="font-semibold">{post.author.name}</p>

              {/* ⭐ Safe username link */}
              {post.author.username ? (
                <Link
                  href={`/u/${post.author.username}`}
                  className="text-sm text-neutral-400 hover:underline"
                >
                  @{post.author.username}
                </Link>
              ) : (
                <span className="text-sm text-neutral-500">
                  Unknown user
                </span>
              )}
            </div>
          </div>

          <p className="text-neutral-200 whitespace-pre-line">{post.content}</p>

          <p className="text-xs text-neutral-500 mt-3">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
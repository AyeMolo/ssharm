import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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

  return NextResponse.json(posts);
}
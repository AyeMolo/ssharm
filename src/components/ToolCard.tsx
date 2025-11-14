// src/components/ToolCard.tsx
"use client";

import type { Tool } from "@/lib/tools";
import { useRouter } from "next/navigation";

// Card for a single tool in the tools list.
export default function ToolCard({ tool }: { tool: Tool }) {
  const router = useRouter();

  function handleClick() {
    // Navigate to /tools/[slug]
    router.push(`/tools/${tool.slug}`);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:bg-neutral-800"
    >
      <h3 className="text-sm font-semibold">{tool.name}</h3>
      <p className="text-xs text-neutral-400 mt-1">{tool.description}</p>
      <p className="text-xs text-neutral-500 mt-2">Open →</p>
    </button>
  );
}
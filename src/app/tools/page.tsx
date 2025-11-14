// src/app/tools/page.tsx

import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

// Tools dashboard page: shows all tools.
export default function ToolsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Tools</h1>
        <p className="text-sm text-neutral-300 max-w-xl">
          These are the tools I&apos;ve built. I&apos;ll keep adding more over
          time. Click any tool to open and use it.
        </p>
      </section>

      {/* Tools grid */}
      <section>
        {tools.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No tools yet. Add some in <code>src/lib/tools.ts</code>.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
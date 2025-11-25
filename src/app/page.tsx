// src/app/page.tsx

import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

// Home page: about you + preview of my tools.
export default function HomePage() {
  // Show at most 2 tools on the home page as a preview.
  const previewTools = tools.slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Intro about you */}
      <section className="space-y-4">
        <p className="text-xs text-neutral-400">Personal Website</p>

        <h1 className="text-3xl font-bold">Hi, I&apos;m Suraaj.</h1>

        <p className="text-sm text-neutral-300 max-w-xl">
          This is my personal site. I&apos;m a student and developer who enjoys
          building small, useful tools for everyday life. This website is a
          place to share a bit about myself and let anyone use the tools I make.
        </p>

        <div className="flex flex-wrap gap-3 text-sm">
          <a href="#about" className="px-4 py-2 rounded-md border border-neutral-700">
            About me
          </a>
          <a
            href="/tools"
            className="px-4 py-2 rounded-md bg-white text-black font-medium"
          >
            View all tools
          </a>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="space-y-3">
        <h2 className="text-lg font-semibold">About me</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-300">
          <p>
          I’m a motivated computer science student at George Mason University who enjoys building real projects and improving my skills every day. I work on everything from websites and backend systems to engineering labs and coding assignments, and I always try to understand things clearly and fully. I’m focused, detail-oriented, and always looking for ways to grow—whether it’s through school, personal projects, or career opportunities. Outside of class, I love cars, making content, and creating tools that help people. I take pride in staying consistent, working hard, and constantly pushing myself to reach bigger goals.
          </p>
          <p className="text-xs text-neutral-500 mt-2">
            (For now this is just placeholder)
          </p>
        </div>
      </section>

      {/* Tools preview section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tools I&apos;ve built</h2>
          <a href="/tools" className="text-xs text-neutral-400 hover:underline">
            See all tools {previewTools.length}.
          </a>
        </div>

        {previewTools.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No tools yet. Add some in <code>src/lib/tools.ts</code>.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {previewTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
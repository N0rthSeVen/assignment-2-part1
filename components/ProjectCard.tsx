import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
        {project.context}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-zinc-950 group-hover:underline dark:text-zinc-50">
        {project.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </li>
        ))}
      </ul>
      <span className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
        Read more →
      </span>
    </Link>
  );
}

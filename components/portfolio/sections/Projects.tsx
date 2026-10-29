import type { Project, TechStack } from "@/types"

interface ProjectsProps {
  projects: readonly Project[]
  techStack: readonly TechStack[]
}

export function Projects({ projects, techStack }: ProjectsProps) {
  const personalProjects = projects.filter(
    (project) => project.kind === "personal",
  )

  return (
    <section
      aria-labelledby="projects-title"
      className="scroll-mt-8 space-y-6"
      id="projects"
    >
      <header className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">Personal work</p>
        <h2
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          id="projects-title"
        >
          Projects
        </h2>
      </header>
      {personalProjects.length > 0 ? (
        <ul className="grid gap-5 md:grid-cols-2">
          {personalProjects.map((project) => {
            const stackLabels = techStack
              .filter((item) => project.techStackIds.includes(item.id))
              .map((item) => item.label)

            return (
              <li key={project.id}>
                <article className="h-full rounded-xl border border-border bg-card p-5 text-card-foreground sm:p-6">
                  <h3 className="text-xl font-semibold leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {project.problem}
                  </p>
                  <p className="mt-3">{project.shippedSolution}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {project.ownership}
                  </p>
                  {stackLabels.length > 0 ? (
                    <p className="mt-4 text-sm">
                      <span className="font-semibold">Stack: </span>
                      {stackLabels.join(", ")}
                    </p>
                  ) : null}
                  {project.links?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-4">
                      {project.links.map((link) => (
                        <li key={`${project.id}-${link.kind}-${link.href}`}>
                          <a
                            className="font-semibold text-primary underline-offset-4 hover:underline"
                            href={link.href}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          No personal projects are available.
        </p>
      )}
    </section>
  )
}

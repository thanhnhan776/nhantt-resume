import type { Experience } from "@/types"

interface SummaryProps {
  experiences: readonly Experience[]
}

export function Summary({ experiences }: SummaryProps) {
  return (
    <section
      aria-labelledby="summary-title"
      className="scroll-mt-24 space-y-6"
      id="summary"
    >
      <header className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">Overview</p>
        <h2
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          id="summary-title"
        >
          Professional experience at a glance
        </h2>
      </header>
      <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
        {experiences.map((experience) => (
          <li
            key={experience.id}
            className="border-l border-border pl-5"
          >
            <h3 className="font-semibold">{experience.employer}</h3>
            <p className="mt-2 text-muted-foreground">{experience.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

import { ExperienceCard } from "@/components/portfolio/cards/ExperienceCard"
import type { Achievement, Experience } from "@/types"

interface ExperienceListProps {
  experiences: readonly Experience[]
  achievements: readonly Achievement[]
}

export function ExperienceList({
  experiences,
  achievements,
}: ExperienceListProps) {
  return (
    <section
      aria-labelledby="experience-title"
      className="scroll-mt-8 space-y-6"
      id="experience"
    >
      <header className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">Selected work</p>
        <h2
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          id="experience-title"
        >
          Employment
        </h2>
      </header>
      <div className="grid gap-5">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            achievements={achievements}
            experience={experience}
          />
        ))}
      </div>
    </section>
  )
}

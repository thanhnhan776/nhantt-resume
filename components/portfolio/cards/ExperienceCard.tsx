import { ImpactBadge } from "@/components/portfolio/cards/ImpactBadge"
import { ExperienceTrigger } from "@/components/portfolio/experience/ExperienceTrigger"
import type { Achievement, Experience } from "@/types"

interface ExperienceCardProps {
  experience: Experience
  achievements: readonly Achievement[]
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function formatMonth(value: string) {
  const [year, month] = value.split("-")
  return `${MONTHS[Number(month) - 1]} ${year}`
}

export function ExperienceCard({
  experience,
  achievements,
}: ExperienceCardProps) {
  const selectedAchievements = achievements
    .filter((achievement) => experience.achievementIds.includes(achievement.id))
    .toSorted((left, right) => {
      const rank = {
        impact: 0,
        delivery: 1,
        quality: 1,
        reliability: 1,
        scope: 2,
      }
      return rank[left.category] - rank[right.category]
    })
    .slice(0, 3)

  return (
    <article className="min-w-0 py-8 first:pt-0">
      <header className="space-y-2">
        <h3 className="text-xl font-semibold leading-snug">
          {experience.employer}
        </h3>
        <p className="font-medium">{experience.role}</p>
        <p className="font-mono text-sm text-muted-foreground">
          <time dateTime={experience.dates.start}>
            {formatMonth(experience.dates.start)}
          </time>
          {"–"}
          {experience.dates.end ? (
            <time dateTime={experience.dates.end}>
              {formatMonth(experience.dates.end)}
            </time>
          ) : (
            "Present"
          )}
          {" · "}
          {experience.location}
        </p>
      </header>
      <p className="mt-4 text-muted-foreground">{experience.summary}</p>
      {selectedAchievements.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {selectedAchievements.map((achievement) => (
            <li key={achievement.id} className="leading-relaxed">
              <ImpactBadge achievement={achievement} />
            </li>
          ))}
        </ul>
      ) : null}
      <ExperienceTrigger experienceId={experience.id}>
        <span className="mt-5 inline-flex min-h-11 items-center rounded-md font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          Explore work <span className="sr-only">at {experience.employer}</span>
        </span>
      </ExperienceTrigger>
    </article>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { achievements } from "@/data/achievements"
import { experiences } from "@/data/experiences"
import { profile } from "@/data/profile"
import { techStack } from "@/data/tech-stack"
import { technicalDiagrams } from "@/data/technical-diagrams"
import { getSiteOrigin } from "@/lib/seo/site-origin"
import { professionalProjects, workHref, workSlug } from "@/lib/work"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return professionalProjects.map((project) => ({ slug: workSlug(project.id) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = professionalProjects.find((item) => workSlug(item.id) === slug)
  if (!project) return {}
  const origin = getSiteOrigin()
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.problem,
    ...(origin ? { alternates: { canonical: workHref(project.id) } } : {}),
  }
}

function TextSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p>{text}</p>
    </section>
  )
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params
  const project = professionalProjects.find((item) => workSlug(item.id) === slug)
  if (!project) notFound()

  const experience = experiences.find((item) => item.id === project.experienceId)
  const technologies = techStack.filter((item) => project.techStackIds.includes(item.id))
  const diagrams = technicalDiagrams.filter((item) => project.technicalDiagramIds.includes(item.id))
  const outcomes = achievements.filter((item) => project.achievementIds.includes(item.id))
  const linkedin = profile.contact.links.find((link) => link.kind === "linkedin")

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-[min(100%-2rem,72rem)] py-12 sm:py-16">
      <a href="/#work" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">← Back to selected work</a>
      <article className="mt-8 space-y-12">
        <header className="max-w-3xl space-y-5">
          {experience && <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{experience.employer} · {experience.role}</p>}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="text-lg leading-relaxed">{project.problem}</p>
          <p><span className="font-semibold">Technologies: </span>{technologies.map((item) => item.label).join(", ")}</p>
        </header>
        <div className="max-w-3xl space-y-10">
          <TextSection title="Problem" text={project.problem} />
          <TextSection title="My ownership" text={project.ownership} />
          <TextSection title="Solution" text={project.shippedSolution} />
        </div>
        {diagrams.map((diagram) => (
          <figure key={diagram.id} className="max-w-5xl rounded-lg border bg-card p-5 sm:p-8">
            <figcaption className="mb-5 space-y-2">
              <h2 className="text-2xl font-semibold">{diagram.title}</h2>
              <p className="text-muted-foreground">{diagram.altSummary}</p>
            </figcaption>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {diagram.steps.map((step, index) => (
                <li key={step.id} className="rounded-md border bg-background p-4">
                  <span className="mr-3 font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{step.label}
                </li>
              ))}
            </ol>
          </figure>
        ))}
        <div className="max-w-3xl space-y-10">
          <TextSection title="Decisions and trade-offs" text={project.tradeOffs} />
          {outcomes.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight">Outcome</h2>
              {outcomes.map((outcome) => <p key={outcome.id}>{project.id === "media-signing" ? "Initial loading fell from several seconds to under one second, in my approximate recollection; not benchmarked." : outcome.statement}</p>)}
            </section>
          )}
          {project.retrospectiveImprovements && <TextSection title="Retrospective improvements" text={project.retrospectiveImprovements} />}
        </div>
      </article>
      <section aria-labelledby="related-work" className="mt-16 border-t pt-8">
        <h2 id="related-work" className="text-2xl font-semibold">More work</h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {professionalProjects.filter((item) => item.id !== project.id).map((item) => (
            <li key={item.id}><a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={workHref(item.id)}>{item.title} →</a></li>
          ))}
        </ul>
      </section>
      <footer className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <div className="mt-3 flex flex-wrap gap-x-6">
          <a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          {linkedin && <a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={linkedin.href}>{linkedin.label}</a>}
          {profile.resume && <a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={profile.resume.href}>{profile.resume.label}</a>}
        </div>
      </footer>
    </main>
  )
}

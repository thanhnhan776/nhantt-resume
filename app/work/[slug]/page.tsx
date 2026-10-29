import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  AffiliateTrackingDiagram,
  MediaSigningDiagram,
  WardrobeWorkflowDiagram,
} from "@/components/portfolio/diagrams/StaticWorkflowDiagrams"
import { achievements } from "@/data/achievements"
import { experiences } from "@/data/experiences"
import { profile } from "@/data/profile"
import { techStack } from "@/data/tech-stack"
import { getSiteOrigin } from "@/lib/seo/site-origin"
import { professionalProjects, workHref, workSlug } from "@/lib/work"
import styles from "./work.module.css"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return professionalProjects.map((project) => ({ slug: workSlug(project.id) }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = professionalProjects.find(
    (item) => workSlug(item.id) === slug,
  )
  if (!project) return {}
  const origin = getSiteOrigin()
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.problem,
    ...(origin ? { alternates: { canonical: workHref(project.id) } } : {}),
  }
}

function ProjectVisual({ id }: { id: string }) {
  if (id === "wardrobe-workflow") return <WardrobeWorkflowDiagram />
  if (id === "media-signing") return <MediaSigningDiagram />
  if (id === "affiliate-phase-two") return <AffiliateTrackingDiagram />
  return null
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params
  const project = professionalProjects.find(
    (item) => workSlug(item.id) === slug,
  )
  if (!project) notFound()

  const experience = experiences.find(
    (item) => item.id === project.experienceId,
  )
  const technologies = techStack.filter((item) =>
    project.techStackIds.includes(item.id),
  )
  const outcomes = achievements.filter((item) =>
    project.achievementIds.includes(item.id),
  )
  const linkedin = profile.contact.links.find(
    (link) => link.kind === "linkedin",
  )

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <a href="/#work" className={styles.link}>
        ← Back to selected work
      </a>
      <article>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Selected work / Case study</p>
            <h1>{project.title}</h1>
            <p className={styles.intro}>{project.shippedSolution}</p>
          </div>
          <dl className={styles.metadata}>
            {experience && (
              <div>
                <dt>Context</dt>
                <dd>{experience.employer}</dd>
              </div>
            )}
            {experience && (
              <div>
                <dt>Role</dt>
                <dd>{experience.role}</dd>
              </div>
            )}
            <div>
              <dt>Technologies</dt>
              <dd>{technologies.map((item) => item.label).join(", ")}</dd>
            </div>
          </dl>
        </header>
        <ProjectVisual id={project.id} />
        <div className={styles.story}>
          <section className={styles.storyRow}>
            <h2>The challenge</h2>
            <div>
              <p>{project.problem}</p>
              <h3>My ownership</h3>
              <p>{project.ownership}</p>
            </div>
          </section>
          <section className={styles.storyRow}>
            <h2>Decisions and trade-offs</h2>
            <div>
              <p>{project.tradeOffs}</p>
              {outcomes.length > 0 && (
                <>
                  <h3>Outcome</h3>
                  {outcomes.map((outcome) => (
                    <p key={outcome.id}>
                      {project.id === "media-signing"
                        ? "Initial loading fell from several seconds to under one second, in my approximate recollection; not benchmarked."
                        : outcome.statement}
                    </p>
                  ))}
                </>
              )}
            </div>
          </section>
          {project.retrospectiveImprovements && (
            <section className={styles.storyRow}>
              <h2>Looking back</h2>
              <div>
                <h3>Retrospective improvements</h3>
                <p>{project.retrospectiveImprovements}</p>
              </div>
            </section>
          )}
        </div>
      </article>
      <section aria-labelledby="related-work" className={styles.more}>
        <h2 id="related-work">More work</h2>
        <ul>
          {professionalProjects
            .filter((item) => item.id !== project.id)
            .map((item) => (
              <li key={item.id}>
                <a className={styles.link} href={workHref(item.id)}>
                  {item.title} →
                </a>
              </li>
            ))}
        </ul>
      </section>
      <footer className={styles.footer}>
        <h2>Contact</h2>
        <div>
          <a className={styles.link} href={`mailto:${profile.contact.email}`}>
            {profile.contact.email}
          </a>
          {linkedin && (
            <a className={styles.link} href={linkedin.href}>
              {linkedin.label}
            </a>
          )}
          {profile.resume && (
            <a className={styles.link} href={profile.resume.href}>
              {profile.resume.label}
            </a>
          )}
        </div>
      </footer>
    </main>
  )
}

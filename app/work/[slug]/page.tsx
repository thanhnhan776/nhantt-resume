import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { achievements } from "@/data/achievements"
import { experiences } from "@/data/experiences"
import { profile } from "@/data/profile"
import { techStack } from "@/data/tech-stack"
import { technicalDiagrams } from "@/data/technical-diagrams"
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
  const diagram = technicalDiagrams.find((item) => item.projectId === id)
  if (id === "wardrobe-workflow" && diagram) {
    return (
      <figure className={`${styles.visual} ${styles.wardrobe}`}>
        <figcaption>
          <strong>{diagram.title}</strong>
          <span>Workflow schematic</span>
        </figcaption>
        <div className={styles.wardrobeFlow} aria-hidden="true">
          {diagram.steps.slice(0, 3).map((step) => (
            <div className={styles.stage} key={step.id}>
              {step.label}
            </div>
          ))}
          <div className={styles.branch}>
            <div>Optional beautification</div>
            <div>Skip beautification</div>
          </div>
          {diagram.steps.slice(4).map((step) => (
            <div className={styles.stage} key={step.id}>
              {step.label}
            </div>
          ))}
        </div>
        <p className="sr-only">
          {diagram.altSummary} After background removal, either the optional
          beautification or skip path continues to selection.
        </p>
      </figure>
    )
  }
  if (id === "media-signing") {
    return (
      <figure className={`${styles.visual} ${styles.signing}`}>
        <figcaption>
          <strong>Media URL signing</strong>
          <span>Workflow schematic</span>
        </figcaption>
        <div className={styles.signingFlow} aria-hidden="true">
          <div className={styles.round}>S3 paths</div>
          <div className={styles.lanes}>
            <span>Sign</span>
            <span>Sign</span>
            <span>Sign</span>
          </div>
          <div className={styles.round}>
            Signed URLs
            <br />
            <small>Merged into response</small>
          </div>
        </div>
        <p className="sr-only">
          S3 paths are signed in parallel by a Go service, then signed URLs are
          merged into the response.
        </p>
      </figure>
    )
  }
  if (id === "affiliate-phase-two") {
    return (
      <figure className={`${styles.visual} ${styles.affiliate}`}>
        <figcaption>
          <strong>Conversion tracking</strong>
          <span>Workflow schematic</span>
        </figcaption>
        <div className={styles.affiliateFlow} aria-hidden="true">
          <div className={styles.providers}>
            <span>Rakuten</span>
            <span>Impact</span>
            <span>CJ</span>
            <span>Awin</span>
            <span>Skimlink</span>
          </div>
          <div>Webhooks or five-minute polling ↓</div>
          <div className={styles.affiliateStage}>
            Normalize transaction records
          </div>
          <div>↓</div>
          <div className={styles.affiliateOutput}>Internal analytics</div>
        </div>
        <p className="sr-only">
          Conversions from Rakuten, Impact, CJ, Awin and Skimlink arrive through
          webhooks or five-minute polling, are normalized into transaction
          records and made available for internal analytics.
        </p>
      </figure>
    )
  }
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

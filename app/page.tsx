import { Education } from "@/components/portfolio/sections/Education"
import { LegacyExperienceLink } from "@/components/portfolio/experience/LegacyExperienceLink"
import { experiences } from "@/data/experiences"
import { education, profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { techStack } from "@/data/tech-stack"
import { technicalDiagrams } from "@/data/technical-diagrams"
import { professionalProjects, workHref } from "@/lib/work"
import type { Project } from "@/types"

const selectedIds = [
  "wardrobe-workflow",
  "media-signing",
  "affiliate-phase-two",
]
const linkedin = profile.contact.links.find((link) => link.kind === "linkedin")

function Technologies({ project }: { project: Project }) {
  return (
    <p className="editorial-meta">
      {techStack
        .filter((item) => project.techStackIds.includes(item.id))
        .map((item) => item.label)
        .join(" · ")}
    </p>
  )
}

function Hero() {
  return (
    <section id="top" className="editorial-hero" aria-labelledby="hero-title">
      <div>
        <p className="hero-role">{profile.headline}</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-intro">
          I build full-stack products, from reliable backend workflows to the
          interfaces people use every day.
        </p>
        <p className="hero-location">
          {profile.location} · {profile.timezone}
        </p>
        <div className="editorial-actions">
          <a className="editorial-button" href="#work">
            View selected work <span aria-hidden="true">↓</span>
          </a>
          {profile.resume && (
            <a className="editorial-link" href={profile.resume.href}>
              View résumé ↗
            </a>
          )}
        </div>
        <div className="editorial-contact-links">
          <a href={`mailto:${profile.contact.email}`}>
            {profile.contact.email}
          </a>
          {linkedin && <a href={linkedin.href}>{linkedin.label} ↗</a>}
        </div>
      </div>
      <a
        className="hero-work"
        href="#work"
        aria-label="Explore the wardrobe processing project"
      >
        <span className="hero-work-label">
          Selected work / Wardrobe processing
        </span>
        <span className="hero-work-visual" aria-hidden="true">
          <span>Upload</span>
          <span>Processing</span>
          <span>Wardrobe</span>
        </span>
        <span className="hero-work-caption">
          From images to a digital wardrobe <span aria-hidden="true">↗</span>
        </span>
      </a>
    </section>
  )
}

function WorkPreview({ project }: { project: Project }) {
  const diagram = technicalDiagrams.find(
    (item) => item.projectId === project.id,
  )
  if (project.id === "wardrobe-workflow" && diagram) {
    return (
      <article className="work-preview work-feature wardrobe-feature">
        <div className="work-copy">
          <p className="editorial-kicker">NetVirta · Featured work</p>
          <h3>From batch upload to a finished digital wardrobe.</h3>
          <p>{project.problem}</p>
          <p>
            I owned the upload flow and processing stages, including status,
            retries, and integration.
          </p>
          <a
            className="editorial-link"
            href={workHref(project.id)}
            aria-label={`Read case study: ${project.title}`}
          >
            Read case study <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="wardrobe-flow">
          <figcaption>
            <span>Wardrobe processing</span>
            <span>Workflow overview</span>
          </figcaption>
          <div className="wardrobe-stages" aria-hidden="true">
            <div className="wardrobe-stage">
              <span>01</span>
              <strong>Upload</strong>
            </div>
            <div className="wardrobe-stage">
              <span>02</span>
              <strong>Detection &amp; metadata</strong>
            </div>
            <div className="wardrobe-stage">
              <span>03</span>
              <strong>Background removal</strong>
            </div>
            <div className="wardrobe-branch">
              <div>
                <span>Optional path</span>
                <strong>Beautification</strong>
              </div>
              <div>
                <span>Or</span>
                <strong>Skip</strong>
              </div>
            </div>
            <div className="wardrobe-stage">
              <span>04</span>
              <strong>Selection</strong>
            </div>
            <div className="wardrobe-stage wardrobe-stage-final">
              <span>05</span>
              <strong>Final wardrobe creation</strong>
            </div>
          </div>
          <p className="sr-only">
            {diagram.altSummary} After background removal, beautification is
            optional; either path continues to selection and final wardrobe
            creation.
          </p>
        </figure>
      </article>
    )
  }
  return (
    <article className={`work-preview work-story work-story-${project.id}`}>
      {project.id === "media-signing" ? (
        <MediaSigningIllustration />
      ) : (
        <AffiliateIllustration />
      )}
      <div className="work-copy">
        <p className="editorial-kicker">NetVirta · Engineering work</p>
        <h3>{project.title}</h3>
        <p>{project.problem}</p>
        <p>
          {project.id === "media-signing"
            ? "I built a Go service to sign paths in parallel and merge the URLs into the response."
            : "I implemented provider ingestion and normalization for internal analytics."}
        </p>
        <a
          className="editorial-link"
          href={workHref(project.id)}
          aria-label={`Read case study: ${project.title}`}
        >
          Read case study <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function MediaSigningIllustration() {
  return (
    <figure className="story-visual signing-visual">
      <figcaption>
        Media signing <span>Workflow schematic</span>
      </figcaption>
      <div className="signing-flow" aria-hidden="true">
        <div className="signing-source">S3 paths</div>
        <div className="signing-lanes">
          <span>Sign</span>
          <span>Sign</span>
          <span>Sign</span>
        </div>
        <div className="signing-result">
          Signed URLs
          <br />
          <small>merged into response</small>
        </div>
      </div>
      <p className="sr-only">
        S3 paths are signed in parallel by a Go service, then signed URLs are
        merged into the response.
      </p>
    </figure>
  )
}

function AffiliateIllustration() {
  return (
    <figure className="story-visual affiliate-visual">
      <figcaption>
        Conversion tracking <span>Workflow schematic</span>
      </figcaption>
      <div className="affiliate-flow" aria-hidden="true">
        <div className="affiliate-providers">
          <span>Rakuten</span>
          <span>Impact</span>
          <span>CJ</span>
          <span>Awin</span>
          <span>Skimlink</span>
        </div>
        <div className="affiliate-connector">
          Webhooks or polling <span>↓</span>
        </div>
        <div className="affiliate-stage">Normalize transactions</div>
        <div className="affiliate-connector">
          <span>↓</span>
        </div>
        <div className="affiliate-stage affiliate-output">
          Internal analytics
        </div>
      </div>
      <p className="sr-only">
        Conversions from Rakuten, Impact, CJ, Awin and Skimlink arrive through
        webhooks or polling, are normalized into transaction records and made
        available for internal analytics.
      </p>
    </figure>
  )
}

function SelectedWork() {
  const selected = selectedIds.flatMap((id) =>
    professionalProjects.filter((project) => project.id === id),
  )
  const more = professionalProjects.filter(
    (project) => !selectedIds.includes(project.id),
  )
  return (
    <section id="work" aria-labelledby="work-title">
      <header className="editorial-section-heading">
        <p className="editorial-kicker">01 / Selected work</p>
        <h2 id="work-title">Selected work.</h2>
        <p>
          Three examples of the problems I have worked on and how I approached
          them.
        </p>
      </header>
      <div className="work-grid">
        {selected.map((project) => (
          <WorkPreview key={project.id} project={project} />
        ))}
      </div>
      <div className="more-work">
        <h3>More engineering work</h3>
        <ul>
          {more.map((project) => (
            <li key={project.id}>
              <a href={workHref(project.id)}>{project.title} ↗</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <header className="editorial-section-heading">
        <p className="editorial-kicker">02 / Experience</p>
        <h2 id="experience-title">Where I’ve worked.</h2>
      </header>
      <div className="experience-list">
        {experiences.map((experience) => (
          <article
            key={experience.id}
            id={experience.id}
            className="experience-row"
          >
            <p className="editorial-meta">
              <time dateTime={experience.dates.start}>
                {experience.dates.start}
              </time>{" "}
              —{" "}
              {experience.dates.end ? (
                <time dateTime={experience.dates.end}>
                  {experience.dates.end}
                </time>
              ) : (
                "Present"
              )}
              <br />
              {experience.location}
            </p>
            <div>
              <h3>{experience.employer}</h3>
              <p className="experience-role">{experience.role}</p>
              <p>{experience.summary}</p>
              {experience.id === "netvirta" && (
                <ul className="experience-links">
                  <li>
                    <a href={workHref("wardrobe-workflow")}>
                      Wardrobe processing ↗
                    </a>
                  </li>
                  <li>
                    <a href={workHref("media-signing")}>Media signing ↗</a>
                  </li>
                  <li>
                    <a href={workHref("affiliate-phase-two")}>
                      Affiliate tracking ↗
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PersonalProjects() {
  const personal = projects.filter((project) => project.kind === "personal")
  return (
    <section id="projects" aria-labelledby="projects-title">
      <header className="editorial-section-heading">
        <p className="editorial-kicker">03 / Personal projects</p>
        <h2 id="projects-title">Projects of my own.</h2>
      </header>
      <div className="personal-grid">
        {personal.map((project) => (
          <article
            className={`personal-project personal-${project.id}`}
            key={project.id}
          >
            <div className="personal-copy">
              <p className="editorial-kicker">
                Personal project{" "}
                {project.id === "greenhuman-landing-page" && "· Oct–Dec 2024"}
              </p>
              <h3>
                {project.id === "greenhuman-landing-page"
                  ? "GreenHuman.com.vn"
                  : project.title}
              </h3>
              <p>
                {project.id === "vcs-badminton-admin"
                  ? "I use this on my phone while commuting to set up recurring registrations and prepare the group’s report."
                  : "A business landing page for a human-resource provider, with job-posting content managed through Sanity."}
              </p>
              <Technologies project={project} />
            </div>
            <figure className="personal-visual">
              <figcaption>Workflow schematic</figcaption>
              <ol>
                {(project.id === "vcs-badminton-admin"
                  ? ["Registration setup", "Submissions", "Registration report"]
                  : ["Job content management", "Business landing page"]
                ).map((stage) => (
                  <li key={stage}>{stage}</li>
                ))}
              </ol>
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" className="editorial-footer">
      <p className="editorial-kicker">Get in touch</p>
      <h2>Let’s start a conversation.</h2>
      <p>Have a question about my work? I’d be glad to hear from you.</p>
      <div className="editorial-actions">
        <a
          className="editorial-button"
          href={`mailto:${profile.contact.email}`}
        >
          {profile.contact.email} ↗
        </a>
        {linkedin && (
          <a className="editorial-link" href={linkedin.href}>
            LinkedIn ↗
          </a>
        )}
        {profile.resume && (
          <a className="editorial-link" href={profile.resume.href}>
            View résumé ↗
          </a>
        )}
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <LegacyExperienceLink
        ids={experiences.map((experience) => experience.id)}
      />
      <Hero />
      <SelectedWork />
      <Experience />
      <PersonalProjects />
      <Education education={education} />
      <Contact />
    </main>
  )
}

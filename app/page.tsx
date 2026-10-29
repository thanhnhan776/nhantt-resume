import { Education } from "@/components/portfolio/sections/Education"
import { LegacyExperienceLink } from "@/components/portfolio/experience/LegacyExperienceLink"
import {
  AffiliateTrackingDiagram,
  MediaSigningDiagram,
  WardrobeWorkflowDiagram,
} from "@/components/portfolio/diagrams/StaticWorkflowDiagrams"
import { experiences } from "@/data/experiences"
import { education, profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { techStack } from "@/data/tech-stack"
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
        href={workHref("wardrobe-workflow")}
        aria-label="Explore the wardrobe processing project"
      >
        <span className="hero-work-label">
          Selected work / Wardrobe processing
        </span>
        <span className="hero-work-visual" aria-hidden="true">
          <span>Upload</span>
          <span className="hero-work-arrow">→</span>
          <span>Processing</span>
          <span className="hero-work-arrow">→</span>
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
  if (project.id === "wardrobe-workflow") {
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
        <WardrobeWorkflowDiagram />
      </article>
    )
  }
  return (
    <article className={`work-preview work-story work-story-${project.id}`}>
      {project.id === "media-signing" ? (
        <MediaSigningDiagram />
      ) : (
        <AffiliateTrackingDiagram />
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

import { Education } from "@/components/portfolio/sections/Education"
import { LegacyExperienceLink } from "@/components/portfolio/experience/LegacyExperienceLink"
import { experiences } from "@/data/experiences"
import { education, profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { techStack } from "@/data/tech-stack"
import { technicalDiagrams } from "@/data/technical-diagrams"
import { professionalProjects, workHref } from "@/lib/work"
import type { Project } from "@/types"

const selectedIds = ["wardrobe-workflow", "media-signing", "affiliate-phase-two"]
const linkedin = profile.contact.links.find((link) => link.kind === "linkedin")

function Technologies({ project }: { project: Project }) {
  return (
    <p className="editorial-meta">
      {techStack.filter((item) => project.techStackIds.includes(item.id)).map((item) => item.label).join(" · ")}
    </p>
  )
}

function Hero() {
  return (
    <section id="top" className="editorial-hero" aria-labelledby="hero-title">
      <div>
        <p className="editorial-kicker">{profile.name} · {profile.location} / {profile.timezone}</p>
        <h1 id="hero-title">{profile.headline}</h1>
        <p className="hero-intro">I build full-stack products, from reliable backend workflows to the interfaces people use every day.</p>
        <div className="editorial-actions">
          <a className="editorial-button" href="#work">View selected work <span aria-hidden="true">↓</span></a>
          {profile.resume && <a className="editorial-link" href={profile.resume.href}>View résumé ↗</a>}
        </div>
        <div className="editorial-contact-links">
          <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          {linkedin && <a href={linkedin.href}>{linkedin.label} ↗</a>}
        </div>
      </div>
      <aside className="hero-note" aria-label="Engineering focus">
        <p className="editorial-kicker">A focus on useful systems</p>
        <p>From multi-stage image processing to integrations and responsive product interfaces.</p>
        <span>Backend workflows <span aria-hidden="true">↗</span> Product interfaces</span>
      </aside>
    </section>
  )
}

function WorkPreview({ project }: { project: Project }) {
  const diagram = technicalDiagrams.find((item) => item.projectId === project.id)
  return (
    <article className={`work-preview${diagram ? " work-feature" : ""}`}>
      <div className="work-copy">
        <p className="editorial-kicker">NetVirta · Engineering work</p>
        <h3>{project.title}</h3>
        <p>{project.problem}</p>
        <p><strong>My contribution.</strong> {project.ownership}</p>
        <p><strong>Outcome.</strong> {project.id === "media-signing" ? "Initial loading fell from several seconds to under one second, in my approximate recollection; not benchmarked." : project.shippedSolution}</p>
        <Technologies project={project} />
        <a className="editorial-link" href={workHref(project.id)}>Read case study <span aria-hidden="true">↗</span><span className="sr-only">: {project.title}</span></a>
      </div>
      {diagram && (
        <figure className="work-flow">
          <figcaption className="editorial-kicker">Workflow overview</figcaption>
          <ol>{diagram.steps.map((step) => <li key={step.id}>{step.label}</li>)}</ol>
          <p>Optional beautification can be skipped before selection.</p>
        </figure>
      )}
    </article>
  )
}

function SelectedWork() {
  const selected = selectedIds.flatMap((id) => professionalProjects.filter((project) => project.id === id))
  const more = professionalProjects.filter((project) => !selectedIds.includes(project.id))
  return (
    <section id="work" aria-labelledby="work-title">
      <header className="editorial-section-heading"><p className="editorial-kicker">01 / Selected work</p><h2 id="work-title">Engineering, in practice.</h2><p>Three examples of the problems I have worked on and how I approached them.</p></header>
      <div className="work-grid">{selected.map((project) => <WorkPreview key={project.id} project={project} />)}</div>
      <div className="more-work"><h3>More engineering work</h3><ul>{more.map((project) => <li key={project.id}><a href={workHref(project.id)}>{project.title} ↗</a></li>)}</ul></div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <header className="editorial-section-heading"><p className="editorial-kicker">02 / Experience</p><h2 id="experience-title">Where I’ve worked.</h2></header>
      <div className="experience-list">{experiences.map((experience) => (
        <article key={experience.id} id={experience.id} className="experience-row">
          <p className="editorial-meta"><time dateTime={experience.dates.start}>{experience.dates.start}</time> — {experience.dates.end ? <time dateTime={experience.dates.end}>{experience.dates.end}</time> : "Present"}<br />{experience.location}</p>
          <div><h3>{experience.employer}</h3><p className="experience-role">{experience.role}</p><p>{experience.summary}</p>
            {experience.id === "netvirta" && <ul className="experience-links"><li><a href={workHref("wardrobe-workflow")}>Wardrobe processing ↗</a></li><li><a href={workHref("media-signing")}>Media signing ↗</a></li><li><a href={workHref("affiliate-phase-two")}>Affiliate tracking ↗</a></li></ul>}
          </div>
        </article>
      ))}</div>
    </section>
  )
}

function PersonalProjects() {
  const personal = projects.filter((project) => project.kind === "personal")
  return (
    <section id="projects" aria-labelledby="projects-title">
      <header className="editorial-section-heading"><p className="editorial-kicker">03 / Personal projects</p><h2 id="projects-title">Built for a purpose.</h2></header>
      <div className="personal-grid">{personal.map((project) => (
        <article className="personal-project" key={project.id}>
          <p className="editorial-kicker">Personal project</p><h3>{project.title}</h3><p>{project.problem}</p>
          <p>{project.id === "vcs-badminton-admin" ? "I built an admin workflow to streamline registration setup and report preparation, and use it on my phone while commuting." : project.shippedSolution}</p>
          <Technologies project={project} />
          <div className="personal-flow">{project.id === "vcs-badminton-admin" ? "Registration setup → submissions → report" : "Business landing page → job-posting content management"}</div>
        </article>
      ))}</div>
    </section>
  )
}

function Contact() {
  return <footer id="contact" className="editorial-footer"><p className="editorial-kicker">Get in touch</p><h2>Let’s start a conversation.</h2><p>Have a question about my work? I’d be glad to hear from you.</p><div className="editorial-actions"><a className="editorial-button" href={`mailto:${profile.contact.email}`}>{profile.contact.email} ↗</a>{linkedin && <a className="editorial-link" href={linkedin.href}>LinkedIn ↗</a>}{profile.resume && <a className="editorial-link" href={profile.resume.href}>View résumé ↗</a>}</div></footer>
}

export default function HomePage() {
  return <main id="main-content" className="site-main" tabIndex={-1}><LegacyExperienceLink ids={experiences.map((experience) => experience.id)} /><Hero /><SelectedWork /><Experience /><PersonalProjects /><Education education={education} /><Contact /></main>
}

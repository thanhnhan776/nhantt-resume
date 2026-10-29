import { CommandPalette } from "@/components/portfolio/actions/CommandPalette"
import { InteractionRoot } from "@/components/portfolio/experience/InteractionRoot"
import {
  ContactFooter,
  Education,
  ExperienceList,
  Hero,
  Projects,
  Summary,
} from "@/components/portfolio/sections"
import { achievements } from "@/data/achievements"
import { experiences } from "@/data/experiences"
import { education, profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { techStack } from "@/data/tech-stack"
import { technicalDiagrams } from "@/data/technical-diagrams"
import { ACTIONS } from "@/lib/actions"

export default function HomePage() {
  return (
    <InteractionRoot
      experiences={experiences}
      projects={projects}
      achievements={achievements}
      techStack={techStack}
      diagrams={technicalDiagrams}
    >
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Hero profile={profile} />
        <Summary experiences={experiences} />
        <ExperienceList experiences={experiences} achievements={achievements} />
        <Projects projects={projects} techStack={techStack} />
        <Education education={education} />
        <ContactFooter profile={profile} />
      </main>
      <CommandPalette actions={ACTIONS} />
    </InteractionRoot>
  )
}

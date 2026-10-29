import { QuickActionBar } from "@/components/portfolio/actions/QuickActionBar"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { ACTIONS } from "@/lib/actions"
import type { Profile } from "@/types"

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const linkedIn = profile.contact.links.find(
    (link) => link.kind === "linkedin",
  )

  return (
    <section
      aria-labelledby="hero-title"
      className="scroll-mt-8 space-y-6 border-b border-border pb-12 sm:pb-16"
      id="top"
    >
      <nav aria-label="Page sections">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a className="underline-offset-4 hover:underline" href="#summary">
              Overview
            </a>
          </li>
          <li>
            <a
              className="underline-offset-4 hover:underline"
              href="#experience"
            >
              Experience
            </a>
          </li>
          <li>
            <a className="underline-offset-4 hover:underline" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="underline-offset-4 hover:underline" href="#education">
              Education
            </a>
          </li>
          <li>
            <a className="underline-offset-4 hover:underline" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 space-y-3">
          <p className="font-mono text-sm text-muted-foreground">
            {profile.location} · {profile.timezone}
          </p>
          <h1
            className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
            id="hero-title"
          >
            {profile.name}
          </h1>
          <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
            {profile.headline}
          </p>
          {profile.experienceClaim ? (
            <p className="text-muted-foreground">
              {profile.experienceClaim.label} (as of{" "}
              {profile.experienceClaim.asOf})
            </p>
          ) : null}
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <a
          className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
          href={`mailto:${profile.contact.email}`}
        >
          Email {profile.contact.email}
        </a>
        {linkedIn ? (
          <a
            className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
            href={linkedIn.href}
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        ) : null}
        {profile.resume ? (
          <a
            className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
            href={profile.resume.href}
          >
            {profile.resume.label}
          </a>
        ) : null}
      </div>
      <QuickActionBar actions={ACTIONS} />
    </section>
  )
}

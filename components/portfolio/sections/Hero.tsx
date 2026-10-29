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
      className="scroll-mt-24 space-y-7 pb-16 sm:pb-24"
      id="top"
    >
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
    </section>
  )
}

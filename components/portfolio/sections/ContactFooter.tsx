import type { Profile } from "@/types"

interface ContactFooterProps {
  profile: Profile
}

export function ContactFooter({ profile }: ContactFooterProps) {
  const linkedIn = profile.contact.links.find(
    (link) => link.kind === "linkedin",
  )

  return (
    <footer className="scroll-mt-24 border-t border-border/50 pt-8" id="contact">
      <h2 className="text-2xl font-semibold tracking-tight" id="contact-title">
        Contact
      </h2>
      <p className="mt-2 text-muted-foreground">
        Get in touch about engineering work and collaboration.
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
        <li>
          <a
            className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
            href={`mailto:${profile.contact.email}`}
          >
            {profile.contact.email}
          </a>
        </li>
        {linkedIn ? (
          <li>
            <a
              className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
              href={linkedIn.href}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
        ) : null}
      </ul>
    </footer>
  )
}

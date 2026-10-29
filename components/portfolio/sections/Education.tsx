import type { Education as EducationRecord } from "@/types"

interface EducationProps {
  education: readonly EducationRecord[]
}

function formatMonth(value: string) {
  const [year, month] = value.split("-")
  return `${new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)))} ${year}`
}

export function Education({ education }: EducationProps) {
  return (
    <section
      aria-labelledby="education-title"
      className="scroll-mt-8 space-y-6"
      id="education"
    >
      <header className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">Learning</p>
        <h2
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          id="education-title"
        >
          Education
        </h2>
      </header>
      {education.length > 0 ? (
        <ul className="grid gap-4">
          {education.map((record) => (
            <li key={record.id}>
              <article className="rounded-xl border border-border bg-card p-5 text-card-foreground sm:p-6">
                <h3 className="text-lg font-semibold">{record.school}</h3>
                <p className="mt-1">{record.degree}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <time dateTime={record.dates.start}>
                    {formatMonth(record.dates.start)}
                  </time>
                  {"–"}
                  {record.dates.end ? (
                    <time dateTime={record.dates.end}>
                      {formatMonth(record.dates.end)}
                    </time>
                  ) : (
                    "Present"
                  )}
                </p>
                {record.honors?.length ? (
                  <ul className="mt-3 list-inside list-disc text-muted-foreground">
                    {record.honors.map((honor) => (
                      <li key={honor}>{honor}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          No education details are available.
        </p>
      )}
    </section>
  )
}

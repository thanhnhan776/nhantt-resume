"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CodeView } from "@/components/portfolio/code/CodeView"
import { DiagramContainer } from "@/components/portfolio/diagrams/DiagramContainer"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { requestCommandOpen } from "@/lib/overlay/coordinator"
import type {
  Achievement,
  ContentId,
  Experience,
  Project,
  TechnicalDiagram,
  TechStack,
} from "@/types"

interface ExperienceSheetProps {
  experience: Experience
  projects: readonly Project[]
  achievements: readonly Achievement[]
  techStack: readonly TechStack[]
  diagrams: readonly TechnicalDiagram[]
  selectedProjectId?: ContentId
  onClose(): void
}

function formatMonth(month: string): string {
  const [year, number] = month.split("-").map(Number)
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(Date.UTC(year, number - 1, 1)))
}

export function ExperienceSheet({
  experience,
  projects,
  achievements,
  techStack,
  diagrams,
  selectedProjectId,
  onClose,
}: ExperienceSheetProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const projectList = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.kind === "professional" &&
          project.experienceId === experience.id,
      ),
    [experience.id, projects],
  )
  const [activeProjectId, setActiveProjectId] = useState<ContentId>(
    selectedProjectId && projectList.some((p) => p.id === selectedProjectId)
      ? selectedProjectId
      : (projectList[0]?.id ?? ""),
  )
  const activeProject = projectList.find(
    (project) => project.id === activeProjectId,
  )

  useEffect(() => {
    setActiveProjectId(
      selectedProjectId && projectList.some((p) => p.id === selectedProjectId)
        ? selectedProjectId
        : (projectList[0]?.id ?? ""),
    )
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [projectList, selectedProjectId])

  function selectProject(projectId: ContentId) {
    setActiveProjectId(projectId)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  function handleOpenChange(open: boolean) {
    if (!open) onClose()
  }

  const roleDates = `${experience.role} · ${formatMonth(experience.dates.start)}–${experience.dates.end ? formatMonth(experience.dates.end) : "Present"}`

  return (
    <Sheet open onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        aria-describedby="experience-description"
        aria-label={`${experience.employer} experience`}
        showCloseButton
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          document.getElementById("experience-sheet-title")?.focus()
        }}
        onCloseAutoFocus={(event) => event.preventDefault()}
        className="inset-y-0 right-0 h-dvh w-full max-w-none gap-0 overflow-hidden border-l bg-background p-0 sm:w-[min(64rem,85vw)] sm:max-w-none"
      >
        <div className="flex min-h-0 flex-1 flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <SheetHeader className="shrink-0 border-b px-6 py-5 pr-16">
            <SheetTitle
              id="experience-sheet-title"
              tabIndex={-1}
              className="text-xl font-semibold"
            >
              {experience.employer}
            </SheetTitle>
            <SheetDescription id="experience-description">
              {roleDates} · {experience.location}
            </SheetDescription>
            <p className="text-sm text-muted-foreground">
              {experience.summary}
            </p>
          </SheetHeader>
          <div
            ref={scrollRef}
            data-experience-scroll
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5"
          >
            {projectList.length > 0 ? (
              <>
                <div
                  role="tablist"
                  aria-label={`${experience.employer} projects`}
                  className="mb-6 flex gap-2 overflow-x-auto border-b"
                >
                  {projectList.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      id={`project-tab-${project.id}`}
                      aria-selected={activeProjectId === project.id}
                      aria-controls={`project-panel-${project.id}`}
                      onClick={() => selectProject(project.id)}
                      className="min-h-11 shrink-0 border-b-2 px-3 text-sm aria-selected:border-primary aria-selected:text-foreground aria-[selected=false]:border-transparent aria-[selected=false]:text-muted-foreground"
                    >
                      {project.title}
                    </button>
                  ))}
                </div>
                {activeProject && (
                  <section
                    role="tabpanel"
                    id={`project-panel-${activeProject.id}`}
                    aria-labelledby={`project-tab-${activeProject.id}`}
                    className="space-y-8 outline-none"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">
                        {activeProject.title}
                      </h3>
                      <p>{activeProject.problem}</p>
                      <p>{activeProject.shippedSolution}</p>
                    </div>
                    {diagrams
                      .filter((diagram) =>
                        activeProject.technicalDiagramIds.includes(diagram.id),
                      )
                      .map((diagram) => (
                        <DiagramContainer key={diagram.id} diagram={diagram} />
                      ))}
                    <section
                      aria-labelledby="ownership-heading"
                      className="space-y-2"
                    >
                      <h4 id="ownership-heading" className="font-semibold">
                        Ownership
                      </h4>
                      <p>{activeProject.ownership}</p>
                    </section>
                    <section
                      aria-labelledby="details-heading"
                      className="space-y-3"
                    >
                      <h4 id="details-heading" className="font-semibold">
                        Technical details
                      </h4>
                      <div>
                        <h5 className="font-medium">Trade-offs</h5>
                        <p>{activeProject.tradeOffs}</p>
                      </div>
                      {activeProject.retrospectiveImprovements && (
                        <div>
                          <h5 className="font-medium">
                            Retrospective improvements
                          </h5>
                          <p>{activeProject.retrospectiveImprovements}</p>
                        </div>
                      )}
                    </section>
                    {activeProject.approvedSnippet && (
                      <CodeView
                        snippetId={activeProject.id}
                        content={activeProject.approvedSnippet.content}
                        accessibleLabel={`${activeProject.approvedSnippet.title} approved code sample`}
                        title={activeProject.approvedSnippet.title}
                      >
                        <p>{activeProject.shippedSolution}</p>
                      </CodeView>
                    )}
                    <section
                      aria-labelledby="stack-heading"
                      className="space-y-2"
                    >
                      <h4 id="stack-heading" className="font-semibold">
                        Technology
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {activeProject.techStackIds
                          .map((id) => techStack.find((item) => item.id === id))
                          .filter((item): item is TechStack => Boolean(item))
                          .map((item) => (
                            <li
                              key={item.id}
                              className="rounded-full bg-muted px-3 py-1 text-sm"
                            >
                              {item.label}
                            </li>
                          ))}
                      </ul>
                    </section>
                    <section
                      aria-labelledby="achievements-heading"
                      className="space-y-2"
                    >
                      <h4 id="achievements-heading" className="font-semibold">
                        Selected outcomes
                      </h4>
                      <ul className="list-disc space-y-2 pl-5">
                        {activeProject.achievementIds
                          .map((id) =>
                            achievements.find((item) => item.id === id),
                          )
                          .filter((item): item is Achievement => Boolean(item))
                          .map((item) => (
                            <li key={item.id}>{item.statement}</li>
                          ))}
                      </ul>
                    </section>
                  </section>
                )}
              </>
            ) : (
              <p>{experience.summary}</p>
            )}
            <button
              type="button"
              className="mt-8 min-h-11"
              onClick={requestCommandOpen}
            >
              Open command palette
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

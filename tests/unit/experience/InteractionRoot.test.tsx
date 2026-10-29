import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { InteractionRoot } from "@/components/portfolio/experience/InteractionRoot"
import { experiences } from "@/data/experiences"

const project = {
  id: "test-project",
  kind: "professional" as const,
  experienceId: "test-experience",
  title: "Test project",
  problem: "Test problem",
  ownership: "Test ownership",
  shippedSolution: "Test solution",
  tradeOffs: "Test trade-off",
  achievementIds: [],
  technicalDiagramIds: [],
  techStackIds: [],
}

const experience = {
  id: "test-experience",
  employer: "Example employer",
  role: "Engineer",
  location: "HCMC",
  dates: { start: "2021-01", end: "2021-12" },
  summary: "Example summary",
  achievementIds: [],
  projectIds: [project.id],
  techStackIds: [],
}

const props = {
  experiences: [experience],
  projects: [project],
  achievements: [],
  techStack: [],
  diagrams: [],
}

afterEach(() => {
  window.history.replaceState({}, "", "/")
})

describe("InteractionRoot", () => {
  it("opens the actual modal Sheet for an allowlisted selection event", async () => {
    render(
      <InteractionRoot {...props}>
        <main>
          <h2 id="experience">Experience</h2>
          <button type="button">Background action</button>
        </main>
      </InteractionRoot>,
    )

    fireEvent(
      window,
      new CustomEvent("portfolio:experience-select", {
        detail: { experienceId: experience.id },
      }),
    )

    expect(
      await screen.findByRole("dialog", {
        name: /example employer experience/i,
      }),
    ).toBeVisible()
    expect(screen.getByRole("tab", { name: "Test project" })).toBeVisible()
    expect(
      screen.getByRole("button", { name: "Background action", hidden: true }),
    ).toBeInTheDocument()
    expect(document.querySelector("body > div")).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })

  it("ignores invalid query selection without opening an empty dialog", async () => {
    window.history.replaceState({}, "", "/?experience=not-allowed&campaign=one")
    render(<InteractionRoot {...props} />)

    await waitFor(() => {
      expect(new URL(window.location.href).searchParams.has("experience")).toBe(
        false,
      )
    })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(new URL(window.location.href).searchParams.get("campaign")).toBe(
      "one",
    )
  })

  it("supports Escape and returns focus to the invoking trigger", async () => {
    const user = userEvent.setup()
    render(
      <InteractionRoot {...props}>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("portfolio:experience-select", {
                detail: { experienceId: experience.id },
              }),
            )
          }
        >
          Open experience
        </button>
      </InteractionRoot>,
    )
    const trigger = screen.getByRole("button", { name: "Open experience" })
    trigger.focus()
    await user.click(trigger)
    expect(await screen.findByRole("dialog")).toBeVisible()
    await user.keyboard("{Escape}")
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    )
    expect(trigger).toHaveFocus()
  })

  it("focuses the sheet title when its ID differs from the overview heading", async () => {
    const user = userEvent.setup()
    render(
      <InteractionRoot {...props}>
        <main>
          <h2 id="experience-title">Employment</h2>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("portfolio:experience-select", {
                  detail: { experienceId: experience.id },
                }),
              )
            }
          >
            Open experience
          </button>
        </main>
      </InteractionRoot>,
    )

    await user.click(screen.getByRole("button", { name: "Open experience" }))
    const title = await screen.findByRole("heading", {
      name: experience.employer,
    })

    await waitFor(() => expect(title).toHaveFocus())
    expect(title).toHaveAttribute("id", "experience-sheet-title")
  })

  it("opens direct links after hydration and preserves unrelated URL data", async () => {
    window.history.replaceState(
      {},
      "",
      "/?campaign=one&experience=test-experience#contact",
    )
    render(<InteractionRoot {...props} />)

    expect(
      await screen.findByRole("dialog", {
        name: /example employer experience/i,
      }),
    ).toBeVisible()
    expect(new URL(window.location.href).searchParams.get("campaign")).toBe(
      "one",
    )
  })

  it("does not render public project data outside the selected experience", () => {
    const spy = vi.spyOn(window.history, "pushState")
    render(<InteractionRoot experiences={experiences} />)

    expect(
      screen.queryByText("Wardrobe processing workflow"),
    ).not.toBeInTheDocument()
    expect(spy).not.toHaveBeenCalled()
  })
})

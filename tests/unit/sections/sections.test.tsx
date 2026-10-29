import { render, screen, within } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { ExperienceCard } from "@/components/portfolio/cards/ExperienceCard"
import { ContactFooter } from "@/components/portfolio/sections/ContactFooter"
import { Education as EducationSection } from "@/components/portfolio/sections/Education"
import { ExperienceList } from "@/components/portfolio/sections/ExperienceList"
import { Hero } from "@/components/portfolio/sections/Hero"
import { Projects as ProjectsSection } from "@/components/portfolio/sections/Projects"
import { Summary } from "@/components/portfolio/sections/Summary"
import { achievements } from "@/data/achievements"
import { experiences } from "@/data/experiences"
import { education, profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { techStack } from "@/data/tech-stack"

vi.mock("@/components/theme/ThemeToggle", () => ({
  ThemeToggle: () => <fieldset aria-label="Theme control" />,
}))

describe("portfolio sections", () => {
  test("renders approved profile details and visible contact links in the hero", () => {
    render(<Hero profile={profile} />)

    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(profile.headline)).toBeInTheDocument()
    expect(
      screen.getByText(/Ho Chi Minh City, Vietnam · UTC\+7/),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: `Email ${profile.contact.email}` }),
    ).toHaveAttribute("href", `mailto:${profile.contact.email}`)
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nhantt/",
    )
    expect(
      screen.getByRole("link", { name: "View résumé PDF" }),
    ).toHaveAttribute("href", "/resume/Tran-Thanh-Nhan_Resume_VN_Remote.pdf")
    expect(
      screen.getByRole("button", { name: "Go to Overview" }),
    ).toBeInTheDocument()
  })

  test("renders employment in reverse chronology with historical labels and stable detail IDs", () => {
    render(
      <ExperienceList experiences={experiences} achievements={achievements} />,
    )

    const headings = screen.getAllByRole("heading", { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "NetVirta Pte. Ltd",
      "Trusting Social",
      "FPT Software",
    ])
    expect(
      screen.getByText("Software Engineer (Full Stack)"),
    ).toBeInTheDocument()
    expect(
      document.querySelector('time[datetime="2022-01"]'),
    ).toHaveTextContent("Jan 2022")
    expect(
      document.querySelector('time[datetime="2026-07"]'),
    ).toHaveTextContent("Jul 2026")
    expect(screen.getByText(/Singapore/)).toBeInTheDocument()
    expect(screen.queryByText(/Present/)).not.toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: /Explore work at NetVirta Pte\. Ltd/,
      }),
    ).toBeInTheDocument()
  })

  test("labels provider count as scope and does not invent numeric metric badges", () => {
    const { container } = render(
      <ExperienceCard
        experience={experiences[0]}
        achievements={achievements}
      />,
    )

    const badgeTexts = within(container).getAllByText(/Scope:/)
    expect(
      badgeTexts.some((badge) =>
        badge.textContent?.includes("five affiliate providers"),
      ),
    ).toBe(true)
    expect(container.querySelectorAll("strong")).toHaveLength(0)
  })

  test("keeps employer work out of the personal projects section and omits missing links", () => {
    render(<ProjectsSection projects={projects} techStack={techStack} />)

    expect(
      screen.getByRole("heading", { name: /GreenHuman\.com\.vn/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "VCS Badminton Admin" }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { name: "Parallel media URL signing" }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /demo|repository/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(/estimate, not independently measured/i),
    ).toBeInTheDocument()
  })

  test("renders education dates and honors and section anchors", () => {
    render(
      <>
        <Summary experiences={experiences} />
        <EducationSection education={education} />
        <ContactFooter profile={profile} />
      </>,
    )

    expect(
      screen.getByRole("heading", {
        name: /Professional experience at a glance/,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "FPT University" }),
    ).toBeInTheDocument()
    expect(
      document.querySelector('time[datetime="2016-09"]'),
    ).toHaveTextContent("Sep 2016")
    expect(
      document.querySelector('time[datetime="2019-12"]'),
    ).toHaveTextContent("Dec 2019")
    expect(screen.getByText("GPA: 8.3/10")).toBeInTheDocument()
    expect(document.getElementById("summary")).toBeInTheDocument()
    expect(document.getElementById("education")).toBeInTheDocument()
    expect(document.getElementById("contact")).toBeInTheDocument()
  })
})

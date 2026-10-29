import type { Experience } from "../types"

export const experiences: Experience[] = [
  {
    id: "netvirta",
    employer: "NetVirta Pte. Ltd",
    role: "Software Engineer (Full Stack)",
    location: "Singapore",
    dates: { start: "2022-01", end: "2026-07" },
    summary:
      "Built full-stack product capabilities spanning identity and account lifecycle, media and wardrobe workflows, affiliate integrations, commerce synchronization, and Angular-based interfaces.",
    achievementIds: [
      "wardrobe-workflow-delivery",
      "media-signing-optimization",
      "affiliate-phase-two",
    ],
    projectIds: [
      "wardrobe-workflow",
      "media-signing",
      "authentication-lifecycle",
      "affiliate-phase-two",
      "shopify-sync",
      "websdk",
      "bi-portal",
    ],
    techStackIds: [
      "python",
      "django",
      "angular",
      "typescript",
      "go",
      "aws",
      "celery",
      "postgresql",
      "mysql",
      "docker",
      "git",
    ],
  },
  {
    id: "trusting-social",
    employer: "Trusting Social",
    role: "Software Engineer",
    location: "Ho Chi Minh City, Vietnam",
    dates: { start: "2021-07", end: "2021-12" },
    summary:
      "Worked on onboarding REST APIs as part of a three-person backend team.",
    achievementIds: [],
    projectIds: [],
    techStackIds: ["go", "postgresql", "docker", "git", "react"],
  },
  {
    id: "fpt-software",
    employer: "FPT Software",
    role: "Software Engineer",
    location: "Ho Chi Minh City, Vietnam",
    dates: { start: "2020-02", end: "2021-06" },
    summary:
      "Built responsive multilingual applications and REST APIs, wrote unit tests, and collaborated with teams in India, Germany, and China.",
    achievementIds: [],
    projectIds: [],
    techStackIds: [
      "angular",
      "typescript",
      "javascript",
      "java",
      "spring-boot",
      "mysql",
      "docker",
      "git",
    ],
  },
]

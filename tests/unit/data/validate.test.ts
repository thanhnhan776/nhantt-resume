import { describe, expect, test } from "vitest";
import { achievements } from "../../../data/achievements";
import { experiences } from "../../../data/experiences";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";
import { techStack } from "../../../data/tech-stack";
import {
  validateContent,
  validateDateRange,
  validateId,
  validateYearMonth,
} from "../../../data/validate";
import type {
  Achievement,
  Experience,
  Project,
  TechStack,
  TechnicalDiagram,
} from "../../../types";

const validRecords = () => ({
  experiences: structuredClone(experiences),
  projects: structuredClone(projects),
  achievements: structuredClone(achievements),
  techStack: structuredClone(techStack),
});

const minimalExperience = (
  overrides: Partial<Experience> = {},
): Experience => ({
  id: "sample-experience",
  employer: "Sample employer",
  role: "Engineer",
  location: "Remote",
  dates: { start: "2024-01" },
  summary: "Synthetic test fixture.",
  achievementIds: [],
  projectIds: [],
  techStackIds: [],
  ...overrides,
});

const minimalProject = (overrides: Partial<Project> = {}): Project => ({
  id: "sample-personal-project",
  kind: "personal",
  title: "Synthetic project",
  problem: "Synthetic fixture.",
  ownership: "Test-only.",
  shippedSolution: "Test-only.",
  tradeOffs: "Test-only.",
  achievementIds: [],
  technicalDiagramIds: [],
  techStackIds: [],
  ...overrides,
});

const minimalStack = (overrides: Partial<TechStack> = {}): TechStack => ({
  id: "sample-stack",
  label: "Sample",
  category: "tool",
  ...overrides,
});

const issuesFor = (records: ReturnType<typeof validRecords>) =>
  validateContent(records);

describe("public content validation", () => {
  test("accepts all curated public data", () => {
    // Arrange
    const records = validRecords();

    // Act
    const issues = validateContent(records);

    // Assert
    expect(issues).toEqual([]);
  });

  test("accepts a profile without optional links or resume and a project without optional details", () => {
    // Arrange
    const records = {
      experiences: [minimalExperience()],
      projects: [minimalProject()],
      achievements: [] as Achievement[],
      techStack: [minimalStack()],
    };
    const sparseProfile = {
      ...profile,
      contact: { email: profile.contact.email, links: [] },
      resume: undefined,
    };

    // Act
    const issues = validateContent(records);

    // Assert
    expect([issues, sparseProfile.resume, sparseProfile.contact.links]).toEqual(
      [[], undefined, []],
    );
  });

  test("accepts absent optional diagram collections and diagram references", () => {
    // Arrange
    const records = {
      experiences: [minimalExperience()],
      projects: [minimalProject()],
      achievements: [] as Achievement[],
      techStack: [],
    };

    // Act
    const issues = validateContent(records);

    // Assert
    expect(issues).toEqual([]);
  });

  test("rejects duplicate IDs and IDs outside lowercase URL-safe format", () => {
    // Arrange
    const records = validRecords();
    records.achievements.push({ ...records.achievements[0] });
    records.projects.push({ ...records.projects[0], id: "Not URL Safe" });

    // Act
    const issues = issuesFor(records);

    // Assert
    expect(issues.map((issue) => issue.message).join("\n")).toMatch(
      /Duplicate ID/,
    );
    expect(issues.map((issue) => issue.message).join("\n")).toMatch(
      /lowercase URL-safe/,
    );
  });

  test("rejects dangling achievement, project, and stack references", () => {
    // Arrange
    const records = {
      experiences: [
        minimalExperience({
          achievementIds: ["missing-achievement"],
          projectIds: ["missing-project"],
          techStackIds: ["missing-stack"],
        }),
      ],
      projects: [
        minimalProject({
          achievementIds: ["missing-achievement"],
          techStackIds: ["missing-stack"],
          technicalDiagramIds: ["missing-diagram"],
        }),
      ],
      achievements: [] as Achievement[],
      techStack: [] as TechStack[],
    };

    // Act
    const issues = validateContent(records);

    // Assert
    expect(
      issues.filter((issue) => issue.message.includes("does not exist")).length,
    ).toBe(6);
  });

  test("rejects invalid calendar months and reversed YYYY-MM ranges", () => {
    // Arrange
    const range = { start: "2024-10", end: "2024-02" };

    // Act
    const badMonthIssues = validateYearMonth("2024-13", "date");
    const malformedIssues = validateYearMonth("24-01", "date");
    const reversedIssues = validateDateRange(range, "dates");

    // Assert
    expect([
      badMonthIssues.length,
      malformedIssues.length,
      reversedIssues[0]?.message,
    ]).toEqual([1, 1, "End month must not precede the start month."]);
  });

  test("rejects professional projects without a matching employer and personal projects attached to an employer", () => {
    // Arrange
    const records = {
      experiences: [
        minimalExperience({
          id: "employer-one",
          projectIds: ["work-project", "personal-project"],
        }),
      ],
      projects: [
        minimalProject({
          id: "work-project",
          kind: "professional",
          experienceId: "employer-two",
        }),
        minimalProject({ id: "personal-project" }),
      ],
      achievements: [] as Achievement[],
      techStack: [] as TechStack[],
    };

    // Act
    const issues = validateContent(records);

    // Assert
    expect(issues.map((issue) => issue.message).join("\n")).toMatch(
      /must reference an existing experience/,
    );
    expect(issues.map((issue) => issue.message).join("\n")).toMatch(
      /must reference experience/,
    );
    expect(issues.map((issue) => issue.message).join("\n")).toMatch(
      /must not be listed under an experience/,
    );
  });

  test("accepts a diagram with valid project, local IDs, and node endpoints", () => {
    // Arrange
    const diagram: TechnicalDiagram = {
      id: "sample-diagram",
      projectId: "sample-personal-project",
      title: "Synthetic diagram",
      renderer: "nodes-edges",
      altSummary: "Two connected synthetic nodes.",
      steps: [],
      nodes: [
        { id: "source", label: "Source" },
        { id: "target", label: "Target" },
      ],
      edges: [{ id: "connection", from: "source", to: "target" }],
    };
    const records = {
      experiences: [minimalExperience()],
      projects: [minimalProject()],
      achievements: [],
      techStack: [],
      diagrams: [diagram],
    };

    // Act
    const issues = validateContent(records);

    // Assert
    expect(issues).toEqual([]);
  });

  test("rejects dangling diagram project, missing endpoints, duplicate local IDs, and invalid local IDs", () => {
    // Arrange
    const diagram: TechnicalDiagram = {
      id: "sample-diagram",
      projectId: "missing-project",
      title: "Synthetic invalid diagram",
      renderer: "nodes-edges",
      altSummary: "Test-only invalid fixture.",
      steps: [{ id: "same-id", label: "Step" }],
      nodes: [
        { id: "same-id", label: "Node" },
        { id: "Bad ID", label: "Invalid" },
      ],
      edges: [{ id: "edge", from: "absent-source", to: "absent-target" }],
    };
    const records = {
      experiences: [minimalExperience()],
      projects: [minimalProject()],
      achievements: [],
      techStack: [],
      diagrams: [diagram],
    };

    // Act
    const issues = validateContent(records);
    const messages = issues.map((issue) => issue.message).join("\n");

    // Assert
    expect(messages).toMatch(/Project "missing-project" does not exist/);
    expect(messages).toMatch(/Duplicate step\/node\/edge ID/);
    expect(messages).toMatch(/lowercase URL-safe/);
    expect(messages).toMatch(/does not exist in this diagram/);
  });

  test("rejects unsupported non-HTTPS links while accepting approved HTTPS and email links", () => {
    // Arrange
    const records = {
      experiences: [minimalExperience()],
      projects: [
        minimalProject({
          links: [
            { kind: "website", label: "Unsafe", href: "http://example.test" },
          ],
        }),
      ],
      achievements: [] as Achievement[],
      techStack: [
        minimalStack({
          link: {
            kind: "email",
            label: "Email",
            href: "mailto:hello@example.test",
          },
        }),
      ],
    };

    // Act
    const issues = validateContent(records);
    const validLinks = validateContent({
      ...records,
      projects: [
        minimalProject({
          links: [
            { kind: "website", label: "Site", href: "https://example.test" },
          ],
        }),
      ],
    });

    // Assert
    expect([issues.length, validLinks]).toEqual([1, []]);
  });
});

describe("ID validation", () => {
  test("accepts stable lowercase URL-safe identifiers", () => {
    // Arrange
    const id = "work-2024-01";

    // Act
    const issues = validateId(id, "id");

    // Assert
    expect(issues).toEqual([]);
  });

  test("rejects uppercase, spaces, and repeated separators", () => {
    // Arrange
    const invalidIds = ["Uppercase", "has space", "double--hyphen"];

    // Act
    const results = invalidIds.map((id) => validateId(id, "id"));

    // Assert
    expect(results.every((issues) => issues.length === 1)).toBe(true);
  });
});

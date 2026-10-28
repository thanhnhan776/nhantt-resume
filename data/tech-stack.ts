import type { TechStack } from "../types"

export const techStack: TechStack[] = [
  ...["Python", "Go", "Java", "TypeScript", "JavaScript"].map((label) => ({ id: label.toLowerCase(), label, category: "language" as const })),
  ...["Django", "Angular", "React", "Spring Boot", "Next.js", "Tailwind CSS", "Sanity", "Celery"].map((label) => ({ id: label.toLowerCase().replaceAll(" ", "-"), label, category: "framework" as const })),
  ...["AWS", "Cloudflare", "Google Apps Script", "Google Forms", "Google Sheets", "Telegram API", "Docker", "Git"].map((label) => ({ id: label.toLowerCase().replaceAll(" ", "-"), label, category: "platform" as const })),
  ...["PostgreSQL", "MySQL", "DynamoDB"].map((label) => ({ id: label.toLowerCase(), label, category: "database" as const })),
]

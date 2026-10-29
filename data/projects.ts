import type { Project } from "../types"

const professional = (
  project: Omit<Project, "kind" | "technicalDiagramIds"> & {
    technicalDiagramIds?: Project["technicalDiagramIds"]
  },
): Project => ({
  ...project,
  kind: "professional",
  technicalDiagramIds: project.technicalDiagramIds ?? [],
})

export const projects: Project[] = [
  professional({
    id: "wardrobe-workflow",
    experienceId: "netvirta",
    title: "Wardrobe processing workflow",
    problem:
      "Users needed a reliable way to submit batches of images and move them through wardrobe processing.",
    ownership:
      "Owned the end-to-end batch upload flow, Research API integration, processing stages and status, error/retry behavior, idempotency and transaction handling, plus mobile and Django-admin status views.",
    shippedSolution:
      "Connected upload sessions to detection and metadata, background removal, optional beautification, selection, and final wardrobe creation.",
    tradeOffs:
      "The workflow coordinated several processing stages and external integration boundaries while preserving useful status and retry behavior.",
    retrospectiveImprovements:
      "In retrospect, a formal state machine, durable queue, explicit dead-letter/backoff policy, and complete processing history would strengthen the design.",
    achievementIds: ["wardrobe-workflow-delivery"],
    technicalDiagramIds: ["wardrobe-processing-flow"],
    techStackIds: ["python", "django", "celery", "postgresql", "aws"],
  }),
  professional({
    id: "media-signing",
    experienceId: "netvirta",
    title: "Parallel media URL signing",
    problem:
      "Sequential media signing contributed to slow initial API response loading.",
    ownership:
      "Extracted S3 paths, implemented a parallel signing service in Go, and merged signed URLs into the response.",
    shippedSolution:
      "Moved signing work into a reusable Go service that signs paths in parallel. Approximate owner recollection: initial multi-second API loading was reduced to under one second.",
    tradeOffs:
      "Parallel work improved the response path while introducing a service boundary during response assembly.",
    retrospectiveImprovements:
      "Measure before-and-after latency and downstream service metrics to establish a reproducible baseline.",
    achievementIds: ["media-signing-optimization"],
    techStackIds: ["go", "aws"],
  }),
  professional({
    id: "authentication-lifecycle",
    experienceId: "netvirta",
    title: "Authentication and account lifecycle",
    problem:
      "Authentication and account operations spanned identity providers and regional product services.",
    ownership:
      "Worked on login/signup, OTP and provider integrations, a shared canonical UUID across Auth, regional Resource, and Social services, DynamoDB attempt state with exponential backoff, and secure account changes and deletion.",
    shippedSolution:
      "Connected provider authentication and account lifecycle operations across the identity and product-service boundaries.",
    tradeOffs:
      "A shared identity linked services while making account lifecycle coordination and provider boundaries important concerns.",
    retrospectiveImprovements:
      "An explicit deletion state machine, reconciliation, and comprehensive lifecycle tests would improve resilience.",
    achievementIds: [],
    techStackIds: ["python", "django", "aws", "dynamodb"],
  }),
  professional({
    id: "affiliate-phase-two",
    experienceId: "netvirta",
    title: "Affiliate conversion tracking — phase 2",
    problem:
      "Conversion events from multiple affiliate providers needed to be normalized and made available for internal analytics.",
    ownership:
      "Implemented phase-two ingestion across Rakuten, Impact, CJ, Awin, and Skimlink using webhooks or five-minute Celery Beat polling, normalization, retries, weekly reconciliation, and persistence for analytics.",
    shippedSolution:
      "Added provider conversion ingestion and normalized transaction records for internal analytics.",
    tradeOffs:
      "Webhook and polling paths supported different provider behaviors and required reconciliation for eventual consistency.",
    retrospectiveImprovements:
      "Formal provider adapters, transaction state machines, and first-class idempotency would make the integration easier to extend and operate.",
    achievementIds: ["affiliate-phase-two"],
    techStackIds: ["python", "django", "celery", "postgresql"],
  }),
  professional({
    id: "shopify-sync",
    experienceId: "netvirta",
    title: "Shopify product acquisition and synchronization",
    problem:
      "Merchant product data needed to be acquired and handed into the existing transformation workflow.",
    ownership:
      "Worked on app/merchant acquisition, access integration, GraphQL retrieval, Celery page fan-out, validation, retries, and handoff to the existing transformation pipeline. Downstream transformation was owned by others.",
    shippedSolution:
      "Retrieved and validated product data asynchronously before handing it to the existing pipeline.",
    tradeOffs:
      "Background fan-out enabled concurrent retrieval while requiring care around concurrency and API pressure.",
    retrospectiveImprovements:
      "Explicit lifecycle and idempotency, adaptive throttling, and a formal pipeline contract would improve the integration.",
    achievementIds: [],
    techStackIds: ["python", "django", "celery"],
  }),
  professional({
    id: "websdk",
    experienceId: "netvirta",
    title: "Embedded WebSDK",
    problem:
      "Product UI needed to integrate into host websites while retaining a boundary between the host and hosted application.",
    ownership:
      "Implemented host-to-SDK-to-iframe integration, postMessage communication, a bounded clamp-based responsive primitive, and configuration-driven product UI.",
    shippedSolution:
      "Used an embedded hosted application with message-based communication and reusable responsive/configuration patterns.",
    tradeOffs:
      "Iframe isolation provided a clear integration boundary but made communication and debugging more involved; reusable abstractions needed to remain bounded.",
    retrospectiveImprovements:
      "Protocol versioning, security validation, lifecycle integration tests, and observability would strengthen the integration.",
    achievementIds: [],
    techStackIds: ["angular", "typescript"],
  }),
  professional({
    id: "bi-portal",
    experienceId: "netvirta",
    title: "BI Portal",
    problem:
      "The portal needed to map merchant and vendor domains into projects and filter customers for project workflows.",
    ownership:
      "Worked on GraphQL synchronization, TransferList selection, project customer filtering, NvTable templates, NvDynamicForms MultiInput, and Angular upgrade maintenance.",
    shippedSolution:
      "Connected domain mapping and project creation flows with synchronized customer selection and existing Angular shared-library abstractions.",
    tradeOffs:
      "Reusing shared abstractions reduced duplication but made stale synchronized data and shared-library change blast radius relevant concerns.",
    retrospectiveImprovements:
      "An explicit synchronization lifecycle, stable mapping contract, idempotency, integration tests, and observability would improve maintainability.",
    achievementIds: [],
    techStackIds: ["angular", "typescript"],
  }),
  {
    id: "greenhuman-landing-page",
    kind: "personal",
    title: "GreenHuman.com.vn — landing page (Oct–Dec 2024)",
    problem:
      "A human-resource provider firm needed a business landing page and job-posting content management.",
    ownership: "Personal project; owner-provided description.",
    shippedSolution:
      "Built a business landing page with job-posting content managed through Sanity.",
    tradeOffs:
      "No public demo or repository is available to show the implementation.",
    achievementIds: [],
    technicalDiagramIds: [],
    techStackIds: ["next-js", "tailwind-css", "cloudflare", "sanity"],
  },
  {
    id: "vcs-badminton-admin",
    kind: "personal",
    title: "VCS Badminton Admin",
    problem:
      "Organizing registrations required manual form creation, sharing a link in the WhatsApp group, sorting submissions by date/time, and preparing a registration report message.",
    ownership:
      "Active personal project; the owner reports using it on a phone while commuting.",
    shippedSolution:
      "An admin workflow streamlines registration setup and submission/report preparation. The owner reports completing the workflow in under 10 minutes; this is an estimate, not independently measured. The WhatsApp group workflow is distinct from the Telegram API in the recorded stack.",
    tradeOffs:
      "The workflow is tailored to the group's registration process; no public demo or repository is available.",
    achievementIds: ["vcs-admin-workflow"],
    technicalDiagramIds: [],
    techStackIds: [
      "angular",
      "google-apps-script",
      "google-forms",
      "google-sheets",
      "telegram-api",
    ],
  },
]

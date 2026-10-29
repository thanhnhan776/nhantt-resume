import type { CSSProperties } from "react"
import type { TechnicalDiagram } from "../../../types/technical-diagram"

interface WorkflowSvgProps {
  diagram: TechnicalDiagram
  theme?: "light" | "dark"
  showSvg?: boolean
}

const themeStyles: Record<
  NonNullable<WorkflowSvgProps["theme"]>,
  CSSProperties
> = {
  light: { color: "var(--foreground, #18181b)" },
  dark: { color: "var(--foreground, #f4f4f5)" },
}

/** Static, non-interactive drawing; ordered HTML remains the primary narrow-screen path. */
export function WorkflowSvg({
  diagram,
  theme = "light",
  showSvg = true,
}: WorkflowSvgProps) {
  const steps = diagram.steps
  const width = 720
  const nodeWidth = 180
  const nodeHeight = 72
  const gap = 24
  const height = Math.max(112, steps.length * (nodeHeight + gap) + gap)

  return (
    <figure className="workflow-diagram" style={themeStyles[theme]}>
      {showSvg && (
        <svg
          aria-hidden="true"
          className="workflow-diagram__svg"
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          role="presentation"
          preserveAspectRatio="xMidYMin meet"
        >
          {steps.map((step, index) => {
            const x = (width - nodeWidth) / 2
            const y = gap + index * (nodeHeight + gap)
            return (
              <g key={step.id}>
                {index > 0 && (
                  <path
                    d={`M ${width / 2} ${y - gap} V ${y}`}
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={step.detail ? "4 4" : undefined}
                    strokeWidth="2"
                  />
                )}
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="12"
                  fill="var(--card, transparent)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <text
                  x={width / 2}
                  y={y + 32}
                  fill="currentColor"
                  textAnchor="middle"
                  fontSize="16"
                >
                  {step.label}
                </text>
                {step.detail && (
                  <text
                    x={width / 2}
                    y={y + 54}
                    fill="currentColor"
                    textAnchor="middle"
                    fontSize="12"
                  >
                    {step.detail}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      )}
      <figcaption className="sr-only">{diagram.altSummary}</figcaption>
      <ol className="workflow-diagram__steps">
        {steps.map((step) => (
          <li key={step.id}>
            <span>{step.label}</span>
            {step.detail && <p>{step.detail}</p>}
          </li>
        ))}
      </ol>
      {diagram.edges && diagram.nodes && (
        <ul
          className="workflow-diagram__connections"
          aria-label="Workflow connections"
        >
          {diagram.edges.map((edge) => {
            const source = diagram.nodes?.find((node) => node.id === edge.from)
            const target = diagram.nodes?.find((node) => node.id === edge.to)
            if (!source || !target) return null
            return (
              <li key={edge.id}>
                {source.label} to {target.label}
                {edge.label ? ` (${edge.label})` : ""}
              </li>
            )
          })}
        </ul>
      )}
      <style>{`
        .workflow-diagram { margin: 0; color: var(--foreground, currentColor); }
        .workflow-diagram__svg { display: block; height: auto; max-width: 100%; }
        .workflow-diagram__steps { display: grid; gap: 0.75rem; list-style: decimal; padding-inline-start: 1.5rem; }
        @media (max-width: 639px) {
          .workflow-diagram__svg { display: none; }
        .workflow-diagram__steps li { padding: 0.75rem; border: 1px solid var(--border, currentColor); border-radius: 0.5rem; }
        .workflow-diagram__steps p { margin: 0.35rem 0 0; color: var(--muted-foreground, currentColor); }
        .workflow-diagram__connections { margin-block: 1rem; padding-inline-start: 1.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .workflow-diagram, .workflow-diagram * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </figure>
  )
}

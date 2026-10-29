import type { Achievement } from "@/types"

interface ImpactBadgeProps {
  achievement: Achievement
}

export function ImpactBadge({ achievement }: ImpactBadgeProps) {
  const isScope = achievement.category === "scope"

  return (
    <span className="inline-flex max-w-full flex-wrap items-center gap-x-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">
      {achievement.metric ? (
        <strong className="font-semibold">
          {achievement.metric.value} {achievement.metric.unit}
        </strong>
      ) : null}
      <span>
        {isScope && !achievement.metric
          ? `Scope: ${achievement.statement}`
          : achievement.statement}
      </span>
      {achievement.metric ? (
        <span className="text-muted-foreground">
          {achievement.metric.evidenceLabel}
        </span>
      ) : null}
    </span>
  )
}

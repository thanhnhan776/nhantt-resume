"use client"

import dynamic from "next/dynamic"
import type { TechnicalDiagram } from "../../../types/technical-diagram"

export interface ArchitectureExplorerProps {
  diagram: TechnicalDiagram
  selectedModuleId?: string
}

const ArchitectureExplorerClient = dynamic(
  () =>
    import("./ArchitectureExplorerClient").then(
      (module) => module.ArchitectureExplorerClient,
    ),
  {
    ssr: false,
    loading: () => <p role="status">Interactive architecture view loading.</p>,
  },
)

export function ArchitectureExplorer(props: ArchitectureExplorerProps) {
  return <ArchitectureExplorerClient {...props} />
}

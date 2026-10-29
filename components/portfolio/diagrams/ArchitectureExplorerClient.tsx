"use client"

import {
  Background,
  type Edge,
  type Node,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react"
import { useCallback, useMemo, useState } from "react"
import "@xyflow/react/dist/style.css"
import { projects } from "../../../data/projects"
import { techStack } from "../../../data/tech-stack"
import type { TechnicalDiagram } from "../../../types/technical-diagram"

export interface ArchitectureExplorerClientProps {
  diagram: TechnicalDiagram
  selectedModuleId?: string
}

const wardrobeProject = projects.find(
  (project) => project.id === "wardrobe-workflow",
)
const stackById = new Map(techStack.map((entry) => [entry.id, entry.label]))
const WARDROBE_NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  upload: { x: 190, y: 0 },
  "detection-metadata": { x: 190, y: 120 },
  "background-removal": { x: 190, y: 240 },
  beautification: { x: 430, y: 360 },
  selection: { x: 190, y: 480 },
  "wardrobe-creation": { x: 190, y: 600 },
}

function GraphControls() {
  const flow = useReactFlow()
  return (
    <fieldset className="explorer-controls">
      <legend>Diagram controls</legend>
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => void flow.zoomIn()}
      >
        +
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => void flow.zoomOut()}
      >
        −
      </button>
      <button
        type="button"
        aria-label="Fit diagram"
        onClick={() => void flow.fitView()}
      >
        Fit
      </button>
      <button
        type="button"
        aria-label="Reset zoom"
        onClick={() => void flow.setViewport({ x: 0, y: 0, zoom: 1 })}
      >
        Reset
      </button>
    </fieldset>
  )
}

interface WorkflowNodeListProps {
  nodes: NonNullable<TechnicalDiagram["nodes"]>
  selectedId: string
  onSelect(id: string): void
}

function WorkflowNodeList({
  nodes,
  selectedId,
  onSelect,
}: WorkflowNodeListProps) {
  const flow = useReactFlow()
  const select = useCallback(
    (id: string) => {
      onSelect(id)
      flow.setNodes((current) =>
        current.map((node) => ({ ...node, selected: node.id === id })),
      )
    },
    [flow, onSelect],
  )

  return (
    <ul className="explorer-node-list">
      {nodes.map((node) => (
        <li key={node.id}>
          <button
            type="button"
            aria-pressed={node.id === selectedId}
            onClick={() => select(node.id)}
          >
            {node.label}
            {node.id === selectedId ? " — selected" : ""}
          </button>
        </li>
      ))}
    </ul>
  )
}

export function ArchitectureExplorerClient({
  diagram,
  selectedModuleId,
}: ArchitectureExplorerClientProps) {
  const availableNodes = diagram.nodes ?? []
  const initialSelectedNode = availableNodes.find(
    (node) => node.id === selectedModuleId,
  )
  const [localSelection, setLocalSelection] = useState(
    initialSelectedNode?.id ?? availableNodes[0]?.id ?? "",
  )
  const selectedId = localSelection
  const selectNode = useCallback((id: string) => setLocalSelection(id), [])
  const selectedNode = availableNodes.find((node) => node.id === selectedId)
  const nodes = useMemo<Node[]>(
    () =>
      availableNodes.map((node, index) => ({
        id: node.id,
        position: WARDROBE_NODE_POSITIONS[node.id] ?? {
          x: 190,
          y: index * 120,
        },
        data: { label: node.label },
        ariaLabel: `Select ${node.label}`,
        focusable: true,
        selected:
          node.id === (initialSelectedNode?.id ?? availableNodes[0]?.id),
      })),
    [availableNodes, initialSelectedNode?.id],
  )
  const edges = useMemo<Edge[]>(
    () =>
      (diagram.edges ?? []).map((edge) => ({
        id: edge.id,
        source: edge.from,
        target: edge.to,
        label: edge.label,
        ariaLabel: edge.label ? `${edge.label} path` : "Workflow path",
      })),
    [diagram.edges],
  )
  const project =
    diagram.projectId === wardrobeProject?.id ? wardrobeProject : undefined
  const approvedStack = project?.techStackIds
    .map((id) => stackById.get(id))
    .filter(Boolean)

  return (
    <section
      aria-label="Interactive architecture explorer"
      className="architecture-explorer"
    >
      <p>{diagram.altSummary}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {selectedNode
          ? `Selected module: ${selectedNode.label}`
          : "No module selected"}
      </p>
      <ReactFlowProvider>
        <div className="explorer-layout">
          <section className="explorer-graph" aria-label="Architecture graph">
            <ReactFlow
              defaultNodes={nodes}
              defaultEdges={edges}
              nodesFocusable
              edgesFocusable
              fitView
              nodesDraggable={false}
              zoomOnScroll={false}
              panOnScroll={false}
              panOnDrag={false}
              onNodeClick={(_event, node) => selectNode(node.id)}
              onSelectionChange={({ nodes: selectedNodes }) => {
                const selected = selectedNodes[0]
                if (selected && selected.id !== selectedId)
                  selectNode(selected.id)
              }}
            >
              <Background />
              <GraphControls />
            </ReactFlow>
          </section>
          <div>
            <h3>Workflow stages</h3>
            <WorkflowNodeList
              nodes={availableNodes}
              selectedId={selectedId}
              onSelect={selectNode}
            />
            <h3>{selectedNode?.label ?? "Module details"}</h3>
            {selectedNode?.detail && <p>{selectedNode.detail}</p>}
            <h4>Project responsibility and ownership</h4>
            <p>{project?.ownership}</p>
            <h4>Decision and trade-off</h4>
            <p>{project?.tradeOffs}</p>
            <p>
              <strong>Project-level approved stack:</strong>{" "}
              {approvedStack?.join(", ")}
            </p>
            <p>
              <strong>
                Retrospective improvement (not part of the shipped workflow):
              </strong>{" "}
              {project?.retrospectiveImprovements}
            </p>
          </div>
        </div>
      </ReactFlowProvider>
      <style>{`
        .architecture-explorer { color: inherit; }
        .explorer-layout { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(15rem, 1fr); gap: 1rem; }
        .explorer-graph { height: 42rem; min-width: 0; border: 1px solid currentColor; border-radius: .5rem; }
        .architecture-explorer .react-flow { --xy-node-background-color: var(--card, #fff); --xy-node-color: var(--foreground, #18181b); --xy-node-border: 1px solid var(--border, currentColor); --xy-edge-stroke: var(--muted-foreground, currentColor); --xy-controls-button-background-color: var(--card, #fff); --xy-controls-button-color: var(--foreground, #18181b); --xy-controls-button-border-color: var(--border, currentColor); --xy-node-boxshadow-selected: 0 0 0 3px var(--ring, currentColor); }
        .explorer-node-list { max-height: 15rem; overflow: auto; padding-inline-start: 1.5rem; }
        .explorer-node-list button, .explorer-controls button { color: inherit; background: transparent; border: 1px solid currentColor; border-radius: .25rem; padding: .4rem .65rem; margin: .15rem; }
        .explorer-node-list button[aria-pressed="true"] { outline: 3px double currentColor; font-weight: 700; }
        .explorer-controls { display: flex; gap: .25rem; padding: .25rem; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        @media (max-width: 700px) { .explorer-layout { grid-template-columns: 1fr; } .explorer-graph { display: none; } }
        @media (prefers-reduced-motion: reduce) { .architecture-explorer *, .architecture-explorer *::before, .architecture-explorer *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>
    </section>
  )
}

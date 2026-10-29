import type { TechnicalDiagram } from "../types"

export const technicalDiagrams: TechnicalDiagram[] = [
  {
    id: "wardrobe-processing-flow",
    projectId: "wardrobe-workflow",
    title: "Wardrobe image processing workflow",
    renderer: "nodes-edges",
    altSummary:
      "Uploaded images move through detection and metadata, background removal, optional beautification, selection, and final wardrobe creation.",
    steps: [
      { id: "upload-images", label: "Upload" },
      { id: "detect-metadata", label: "Detection and metadata" },
      { id: "remove-background", label: "Background removal" },
      { id: "optional-beautification", label: "Optional beautification" },
      { id: "select-images", label: "Selection" },
      { id: "create-wardrobe", label: "Final wardrobe creation" },
    ],
    nodes: [
      { id: "upload", label: "Upload" },
      { id: "detection-metadata", label: "Detection and metadata" },
      { id: "background-removal", label: "Background removal" },
      { id: "beautification", label: "Optional beautification" },
      { id: "selection", label: "Selection" },
      { id: "wardrobe-creation", label: "Final wardrobe creation" },
    ],
    edges: [
      { id: "upload-to-detection", from: "upload", to: "detection-metadata" },
      {
        id: "detection-to-background-removal",
        from: "detection-metadata",
        to: "background-removal",
      },
      {
        id: "background-to-beautification",
        from: "background-removal",
        to: "beautification",
        label: "optional",
      },
      {
        id: "background-to-selection",
        from: "background-removal",
        to: "selection",
        label: "skip optional step",
      },
      {
        id: "beautification-to-selection",
        from: "beautification",
        to: "selection",
      },
      {
        id: "selection-to-wardrobe",
        from: "selection",
        to: "wardrobe-creation",
      },
    ],
  },
]

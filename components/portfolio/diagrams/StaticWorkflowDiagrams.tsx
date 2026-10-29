import styles from "./static-workflow-diagrams.module.css"

function DiagramFrame({
  title,
  summary,
  children,
}: {
  title: string
  summary: string
  children: React.ReactNode
}) {
  return (
    <figure className={styles.figure}>
      <figcaption>
        <strong>{title}</strong>
        <span>Workflow schematic</span>
      </figcaption>
      {children}
      <p className="sr-only">{summary}</p>
    </figure>
  )
}

export function WardrobeWorkflowDiagram() {
  return (
    <DiagramFrame
      title="Wardrobe image processing"
      summary="Upload moves through detection and metadata and background removal. After background removal, images either pass through optional beautification or skip beautification, then proceed to selection and final wardrobe creation."
    >
      <svg className={styles.diagram} viewBox="0 0 320 440" aria-hidden="true">
        <g className={styles.lines}>
          <path d="M160 45v25m0 42v25m0 42v21h-90v24m90-24h90v24M70 266v24h90m90-24v24h-90v24m0 42v25" />
          <path d="m155 64 5 6 5-6m-10 67 5 6 5-6M65 218l5 6 5-6m170-6 5 6 5-6m-100 90 5 6 5-6m-10 61 5 6 5-6" />
        </g>
        <g className={styles.nodes}>
          <rect x="121" y="12" width="78" height="33" rx="3" />
          <rect x="71" y="70" width="178" height="42" rx="3" />
          <rect x="81" y="137" width="158" height="42" rx="3" />
          <rect x="4" y="224" width="132" height="42" rx="3" />
          <rect x="112" y="314" width="96" height="42" rx="3" />
        </g>
        <g className={styles.labels}>
          <text x="160" y="33">
            Upload
          </text>
          <text x="160" y="96">
            Detection and metadata
          </text>
          <text x="160" y="163">
            Background removal
          </text>
          <text x="70" y="241">
            <tspan x="70">Optional</tspan>
            <tspan x="70" dy="16">
              beautification
            </tspan>
          </text>
          <text x="250" y="238">
            <tspan x="250">Skip</tspan>
            <tspan x="250" dy="16">
              beautification
            </tspan>
          </text>
          <text x="160" y="340">
            Selection
          </text>
          <text x="160" y="418">
            Final wardrobe creation
          </text>
        </g>
        <g className={styles.output}>
          <path d="M146 390h22v16h-22z M151 385h22v16" />
        </g>
      </svg>
    </DiagramFrame>
  )
}

export function MediaSigningDiagram() {
  return (
    <DiagramFrame
      title="Media URL signing"
      summary="Input S3 paths are signed concurrently by a Go service. The signing lanes join, and the signed URLs are merged into the response."
    >
      <svg className={styles.diagram} viewBox="0 0 320 300" aria-hidden="true">
        <g className={styles.lines}>
          <path d="M160 38v26M160 64H65v47m95-47v47m0-47h95v47M65 155v44h95m0-44v44m95-44v44h-95m0 0v36" />
          <path d="m155 105 5 6 5-6m-105 0 5 6 5-6m180-6 5 6 5-6m-100 24 5 6 5-6" />
        </g>
        <rect
          className={styles.boundary}
          x="17"
          y="83"
          width="286"
          height="99"
          rx="3"
        />
        <g className={styles.nodes}>
          <rect x="39" y="111" width="52" height="44" rx="3" />
          <rect x="134" y="111" width="52" height="44" rx="3" />
          <rect x="229" y="111" width="52" height="44" rx="3" />
        </g>
        <g className={styles.labels}>
          <text x="160" y="29">
            Input S3 paths
          </text>
          <text x="160" y="101" className={styles.annotation}>
            Go service · concurrent signing
          </text>
          <text x="65" y="138">
            Sign
          </text>
          <text x="160" y="138">
            Sign
          </text>
          <text x="255" y="138">
            Sign
          </text>
          <text x="160" y="255">
            <tspan x="160">Signed URLs</tspan>
            <tspan x="160" dy="18">
              merged into response
            </tspan>
          </text>
        </g>
      </svg>
    </DiagramFrame>
  )
}

export function AffiliateTrackingDiagram() {
  return (
    <DiagramFrame
      title="Conversion tracking"
      summary="Conversions from Rakuten, Impact, CJ, Awin and Skimlink arrive through webhooks or polling, are ingested and normalized into transaction records, then made available for internal analytics."
    >
      <svg className={styles.diagram} viewBox="0 0 320 310" aria-hidden="true">
        <g className={styles.lines}>
          <path d="M160 61v48m0 42v25m0 42v25m0 24v22" />
          <path d="m155 103 5 6 5-6m-10 64 5 6 5-6m-10 64 5 6 5-6m-10 40 5 6 5-6" />
        </g>
        <g className={styles.nodes}>
          <rect x="101" y="109" width="118" height="42" rx="3" />
          <rect x="94" y="176" width="132" height="42" rx="3" />
        </g>
        <g className={styles.labels}>
          <text x="160" y="24">
            Rakuten · Impact · CJ
          </text>
          <text x="160" y="45">
            Awin · Skimlink
          </text>
          <text x="160" y="88" className={styles.annotation}>
            Webhooks or polling
          </text>
          <text x="160" y="135">
            Ingestion
          </text>
          <text x="160" y="202">
            Normalization
          </text>
          <text x="160" y="260">
            Normalized transaction records
          </text>
          <text x="160" y="305">
            Internal analytics
          </text>
        </g>
      </svg>
    </DiagramFrame>
  )
}

import { css } from "lit";

export const cardStyles = css`
  :host {
    --li-bg:
      radial-gradient(circle at top left, rgba(32, 58, 55, 0.34), transparent 34%),
      radial-gradient(circle at 85% 18%, rgba(26, 87, 60, 0.18), transparent 28%),
      linear-gradient(180deg, #0b121a 0%, #0d151d 42%, #0a1118 100%);
    --li-panel: linear-gradient(180deg, rgba(18, 28, 38, 0.94), rgba(13, 20, 29, 0.96));
    --li-surface: linear-gradient(180deg, rgba(24, 34, 45, 0.96), rgba(16, 24, 34, 0.96));
    --li-surface-strong: linear-gradient(180deg, rgba(29, 41, 54, 0.98), rgba(19, 29, 39, 0.98));
    --li-surface-muted: rgba(14, 22, 30, 0.88);
    --li-text: #edf4f8;
    --li-muted: #8ea0b0;
    --li-border: rgba(136, 162, 181, 0.16);
    --li-accent: #1ad66b;
    --li-accent-soft: #7df7ac;
    --li-accent-dim: rgba(26, 214, 107, 0.16);
    --li-warn: #ffbf3c;
    --li-low: #ff7a63;
    --li-info: #4aa8ff;
    --li-shadow: 0 22px 44px rgba(0, 0, 0, 0.32);
    --li-shadow-strong: 0 18px 36px rgba(0, 0, 0, 0.4);
    --li-ring-fill: rgba(74, 168, 255, 0.08);
    --li-ring-core:
      radial-gradient(circle at center, rgba(12, 20, 28, 0.98) 0 38%, rgba(18, 30, 40, 0.9) 39% 100%);
    --li-ring-inner-stroke: rgba(92, 122, 145, 0.18);
    --li-axis: rgba(110, 141, 165, 0.14);
    --li-dashed-border: rgba(110, 141, 165, 0.18);
    --li-point-border: rgba(210, 230, 245, 0.16);
    --li-editor-input-bg: rgba(14, 22, 30, 0.92);
    --li-editor-chip-bg: rgba(20, 30, 40, 0.96);
    --li-editor-chip-active: rgba(26, 214, 107, 0.14);
    --li-grid:
      linear-gradient(rgba(91, 119, 138, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91, 119, 138, 0.08) 1px, transparent 1px);
    --li-glow: 0 0 0 1px rgba(26, 214, 107, 0.12), 0 0 28px rgba(26, 214, 107, 0.14);
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  ha-card {
    background: var(--li-bg);
    border: 1px solid var(--li-border);
    border-radius: 28px;
    box-shadow: var(--li-shadow);
    overflow: hidden;
  }

  .eyebrow {
    color: var(--li-muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.38rem 0.72rem;
    border-radius: 999px;
    background: var(--li-surface-muted);
    border: 1px solid var(--li-border);
    color: var(--li-text);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .panel {
    background: var(--li-panel);
    border: 1px solid var(--li-border);
    border-radius: 22px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(16px);
  }
`;

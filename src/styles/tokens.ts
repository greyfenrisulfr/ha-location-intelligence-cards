import { css } from "lit";

export const cardStyles = css`
  :host {
    --li-bg: linear-gradient(180deg, #f6f2e8 0%, #e5ece5 100%);
    --li-panel: rgba(255, 252, 245, 0.8);
    --li-text: #1f2a2a;
    --li-muted: #556564;
    --li-border: rgba(40, 76, 63, 0.14);
    --li-accent: #284c3f;
    --li-accent-soft: #5c8968;
    --li-warn: #a5652a;
    --li-low: #a3473c;
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  ha-card {
    background: var(--li-bg);
    border: 1px solid var(--li-border);
    border-radius: 24px;
    box-shadow: 0 18px 40px rgba(31, 42, 42, 0.08);
  }

  .eyebrow {
    color: var(--li-muted);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.62);
    border: 1px solid var(--li-border);
    color: var(--li-text);
    font-size: 0.82rem;
    font-weight: 600;
  }

  .panel {
    background: var(--li-panel);
    border: 1px solid var(--li-border);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }
`;


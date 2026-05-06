import { css } from "lit";

export const cardStyles = css`
  :host {
    --li-bg:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--card-background-color, #f6f2e8) 82%, #f1e7d2 18%) 0%,
        color-mix(in srgb, var(--card-background-color, #e5ece5) 76%, #d5e0d4 24%) 100%
      );
    --li-panel: color-mix(in srgb, var(--card-background-color, #fff) 76%, transparent);
    --li-surface: color-mix(in srgb, var(--card-background-color, #fff) 84%, transparent);
    --li-surface-strong: color-mix(in srgb, var(--card-background-color, #fff) 92%, transparent);
    --li-text: var(--primary-text-color, #1f2a2a);
    --li-muted: var(--secondary-text-color, #556564);
    --li-border: color-mix(in srgb, var(--divider-color, rgba(40, 76, 63, 0.14)) 78%, transparent);
    --li-accent: #284c3f;
    --li-accent-soft: #5c8968;
    --li-warn: #a5652a;
    --li-low: #a3473c;
    --li-shadow: 0 18px 40px rgba(31, 42, 42, 0.08);
    --li-shadow-strong: 0 10px 22px rgba(31, 42, 42, 0.18);
    --li-ring-fill: rgba(255, 255, 255, 0.15);
    --li-ring-core:
      radial-gradient(
        circle at center,
        color-mix(in srgb, var(--card-background-color, #fff) 96%, white 4%) 0 39%,
        color-mix(in srgb, var(--card-background-color, #e4ece5) 90%, transparent) 40% 100%
      );
    --li-ring-inner-stroke: color-mix(in srgb, var(--card-background-color, #fff) 62%, transparent);
    --li-axis: color-mix(in srgb, var(--divider-color, rgba(40, 76, 63, 0.14)) 90%, transparent);
    --li-dashed-border: color-mix(in srgb, var(--divider-color, rgba(40, 76, 63, 0.2)) 92%, transparent);
    --li-point-border: color-mix(in srgb, var(--card-background-color, #fff) 85%, white 15%);
    --li-editor-input-bg: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
    --li-editor-chip-bg: color-mix(in srgb, var(--card-background-color, #fff) 74%, transparent);
    --li-editor-chip-active: color-mix(in srgb, var(--li-accent) 12%, var(--card-background-color, #fff));
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  :host([data-theme="dark"]),
  :host-context(.theme-dark),
  :host-context([data-theme="dark"]) {
    --li-bg:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--card-background-color, #151d1d) 92%, #243328 8%) 0%,
        color-mix(in srgb, var(--card-background-color, #101716) 88%, #1a2724 12%) 100%
      );
    --li-panel: color-mix(in srgb, var(--card-background-color, #121919) 82%, #23312d 18%);
    --li-surface: color-mix(in srgb, var(--card-background-color, #121919) 88%, #293633 12%);
    --li-surface-strong: color-mix(in srgb, var(--card-background-color, #121919) 94%, #31423d 6%);
    --li-border: color-mix(in srgb, var(--divider-color, rgba(132, 168, 150, 0.26)) 88%, transparent);
    --li-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
    --li-shadow-strong: 0 12px 28px rgba(0, 0, 0, 0.34);
    --li-ring-fill: rgba(255, 255, 255, 0.08);
    --li-ring-core:
      radial-gradient(
        circle at center,
        color-mix(in srgb, var(--card-background-color, #0f1515) 96%, white 4%) 0 39%,
        color-mix(in srgb, var(--card-background-color, #162120) 94%, transparent) 40% 100%
      );
    --li-ring-inner-stroke: rgba(255, 255, 255, 0.08);
    --li-axis: rgba(190, 214, 204, 0.14);
    --li-dashed-border: rgba(190, 214, 204, 0.18);
    --li-point-border: rgba(255, 255, 255, 0.18);
    --li-editor-input-bg: color-mix(in srgb, var(--card-background-color, #121919) 94%, #26332f 6%);
    --li-editor-chip-bg: color-mix(in srgb, var(--card-background-color, #121919) 82%, #273530 18%);
    --li-editor-chip-active: color-mix(in srgb, var(--li-accent-soft) 18%, var(--card-background-color, #121919));
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --li-bg:
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--card-background-color, #151d1d) 92%, #243328 8%) 0%,
          color-mix(in srgb, var(--card-background-color, #101716) 88%, #1a2724 12%) 100%
        );
      --li-panel: color-mix(in srgb, var(--card-background-color, #121919) 82%, #23312d 18%);
      --li-surface: color-mix(in srgb, var(--card-background-color, #121919) 88%, #293633 12%);
      --li-surface-strong: color-mix(in srgb, var(--card-background-color, #121919) 94%, #31423d 6%);
      --li-border: color-mix(in srgb, var(--divider-color, rgba(132, 168, 150, 0.26)) 88%, transparent);
      --li-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
      --li-shadow-strong: 0 12px 28px rgba(0, 0, 0, 0.34);
      --li-ring-fill: rgba(255, 255, 255, 0.08);
      --li-ring-core:
        radial-gradient(
          circle at center,
          color-mix(in srgb, var(--card-background-color, #0f1515) 96%, white 4%) 0 39%,
          color-mix(in srgb, var(--card-background-color, #162120) 94%, transparent) 40% 100%
        );
      --li-ring-inner-stroke: rgba(255, 255, 255, 0.08);
      --li-axis: rgba(190, 214, 204, 0.14);
      --li-dashed-border: rgba(190, 214, 204, 0.18);
      --li-point-border: rgba(255, 255, 255, 0.18);
      --li-editor-input-bg: color-mix(in srgb, var(--card-background-color, #121919) 94%, #26332f 6%);
      --li-editor-chip-bg: color-mix(in srgb, var(--card-background-color, #121919) 82%, #273530 18%);
      --li-editor-chip-active: color-mix(in srgb, var(--li-accent-soft) 18%, var(--card-background-color, #121919));
    }
  }

  ha-card {
    background: var(--li-bg);
    border: 1px solid var(--li-border);
    border-radius: 24px;
    box-shadow: var(--li-shadow);
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
    background: var(--li-surface);
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

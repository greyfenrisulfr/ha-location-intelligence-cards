import { css } from "lit";

export const cardStyles = css`
  :host {
    --li-bg:
      radial-gradient(circle at top left, rgba(55, 101, 91, 0.14), transparent 34%),
      radial-gradient(circle at 85% 18%, rgba(80, 144, 114, 0.1), transparent 28%),
      linear-gradient(180deg, #eef4f4 0%, #e6edf1 42%, #dfe7eb 100%);
    --li-panel: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(244, 248, 250, 0.96));
    --li-surface: linear-gradient(180deg, rgba(248, 251, 252, 0.98), rgba(238, 244, 247, 0.98));
    --li-surface-strong: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(244, 248, 250, 0.99));
    --li-surface-muted: rgba(235, 241, 244, 0.92);
    --li-text: #13202a;
    --li-muted: #5f7482;
    --li-border: rgba(86, 115, 134, 0.16);
    --li-accent: #129e56;
    --li-accent-soft: #1fd474;
    --li-accent-dim: rgba(18, 158, 86, 0.12);
    --li-warn: #d29a15;
    --li-low: #d95d48;
    --li-info: #2c7ddf;
    --li-shadow: 0 18px 38px rgba(28, 49, 66, 0.12);
    --li-shadow-strong: 0 14px 28px rgba(28, 49, 66, 0.18);
    --li-ring-fill: rgba(44, 125, 223, 0.08);
    --li-ring-core:
      radial-gradient(circle at center, rgba(244, 249, 251, 0.98) 0 38%, rgba(226, 236, 241, 0.94) 39% 100%);
    --li-ring-inner-stroke: rgba(123, 149, 166, 0.16);
    --li-axis: rgba(109, 132, 149, 0.14);
    --li-dashed-border: rgba(109, 132, 149, 0.18);
    --li-point-border: rgba(255, 255, 255, 0.82);
    --li-editor-input-bg: rgba(247, 251, 252, 0.96);
    --li-editor-chip-bg: rgba(239, 245, 248, 0.98);
    --li-editor-chip-active: rgba(18, 158, 86, 0.12);
    --li-grid:
      linear-gradient(rgba(91, 119, 138, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91, 119, 138, 0.08) 1px, transparent 1px);
    --li-glow: 0 0 0 1px rgba(18, 158, 86, 0.08), 0 0 24px rgba(18, 158, 86, 0.1);
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  :host([data-theme="dark"]),
  :host-context(.theme-dark),
  :host-context([data-theme="dark"]) {
    --li-bg:
      radial-gradient(circle at top left, rgba(30, 63, 58, 0.28), transparent 34%),
      radial-gradient(circle at 84% 18%, rgba(21, 72, 52, 0.14), transparent 28%),
      linear-gradient(180deg, #0a1118 0%, #0d151d 44%, #0b1219 100%);
    --li-panel: linear-gradient(180deg, rgba(16, 24, 34, 0.96), rgba(12, 19, 27, 0.98));
    --li-surface: linear-gradient(180deg, rgba(22, 31, 41, 0.98), rgba(15, 23, 32, 0.98));
    --li-surface-strong: linear-gradient(180deg, rgba(27, 38, 49, 0.99), rgba(17, 26, 35, 0.99));
    --li-surface-muted: rgba(13, 20, 28, 0.9);
    --li-text: #edf4f8;
    --li-muted: #90a2b1;
    --li-border: rgba(136, 162, 181, 0.14);
    --li-accent: #17bc63;
    --li-accent-soft: #76f2a8;
    --li-accent-dim: rgba(23, 188, 99, 0.14);
    --li-warn: #f2b534;
    --li-low: #f37862;
    --li-info: #479fff;
    --li-shadow: 0 22px 44px rgba(0, 0, 0, 0.32);
    --li-shadow-strong: 0 18px 36px rgba(0, 0, 0, 0.4);
    --li-ring-fill: rgba(71, 159, 255, 0.08);
    --li-ring-core:
      radial-gradient(circle at center, rgba(11, 18, 26, 0.98) 0 38%, rgba(16, 26, 35, 0.92) 39% 100%);
    --li-ring-inner-stroke: rgba(92, 122, 145, 0.16);
    --li-axis: rgba(110, 141, 165, 0.13);
    --li-dashed-border: rgba(110, 141, 165, 0.18);
    --li-point-border: rgba(214, 229, 240, 0.16);
    --li-editor-input-bg: rgba(13, 20, 28, 0.94);
    --li-editor-chip-bg: rgba(18, 27, 37, 0.98);
    --li-editor-chip-active: rgba(23, 188, 99, 0.14);
    --li-glow: 0 0 0 1px rgba(23, 188, 99, 0.1), 0 0 24px rgba(23, 188, 99, 0.12);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --li-bg:
        radial-gradient(circle at top left, rgba(30, 63, 58, 0.28), transparent 34%),
        radial-gradient(circle at 84% 18%, rgba(21, 72, 52, 0.14), transparent 28%),
        linear-gradient(180deg, #0a1118 0%, #0d151d 44%, #0b1219 100%);
      --li-panel: linear-gradient(180deg, rgba(16, 24, 34, 0.96), rgba(12, 19, 27, 0.98));
      --li-surface: linear-gradient(180deg, rgba(22, 31, 41, 0.98), rgba(15, 23, 32, 0.98));
      --li-surface-strong: linear-gradient(180deg, rgba(27, 38, 49, 0.99), rgba(17, 26, 35, 0.99));
      --li-surface-muted: rgba(13, 20, 28, 0.9);
      --li-text: #edf4f8;
      --li-muted: #90a2b1;
      --li-border: rgba(136, 162, 181, 0.14);
      --li-accent: #17bc63;
      --li-accent-soft: #76f2a8;
      --li-accent-dim: rgba(23, 188, 99, 0.14);
      --li-warn: #f2b534;
      --li-low: #f37862;
      --li-info: #479fff;
      --li-shadow: 0 22px 44px rgba(0, 0, 0, 0.32);
      --li-shadow-strong: 0 18px 36px rgba(0, 0, 0, 0.4);
      --li-ring-fill: rgba(71, 159, 255, 0.08);
      --li-ring-core:
        radial-gradient(circle at center, rgba(11, 18, 26, 0.98) 0 38%, rgba(16, 26, 35, 0.92) 39% 100%);
      --li-ring-inner-stroke: rgba(92, 122, 145, 0.16);
      --li-axis: rgba(110, 141, 165, 0.13);
      --li-dashed-border: rgba(110, 141, 165, 0.18);
      --li-point-border: rgba(214, 229, 240, 0.16);
      --li-editor-input-bg: rgba(13, 20, 28, 0.94);
      --li-editor-chip-bg: rgba(18, 27, 37, 0.98);
      --li-editor-chip-active: rgba(23, 188, 99, 0.14);
      --li-glow: 0 0 0 1px rgba(23, 188, 99, 0.1), 0 0 24px rgba(23, 188, 99, 0.12);
    }
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

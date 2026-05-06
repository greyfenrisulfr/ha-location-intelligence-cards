import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { confidenceTone, formatConfidence } from "../utils/location";
import { cardStyles } from "../styles/tokens";

@customElement("li-confidence-chip")
export class LiConfidenceChip extends LitElement {
  @property({ attribute: false }) confidence?: number;

  protected render() {
    return html`<span class="chip ${confidenceTone(this.confidence)}">
      ${formatConfidence(this.confidence)}
    </span>`;
  }

  static styles = [
    cardStyles,
    css`
      .chip {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      border: 1px solid transparent;
      font-size: 0.8rem;
      font-weight: 700;
    }

      .high {
        background: color-mix(in srgb, var(--li-accent-soft) 20%, transparent);
        color: color-mix(in srgb, var(--li-accent-soft) 38%, var(--li-text));
        border-color: color-mix(in srgb, var(--li-accent-soft) 28%, transparent);
      }

      .medium {
        background: color-mix(in srgb, var(--li-warn) 18%, transparent);
        color: color-mix(in srgb, var(--li-warn) 42%, var(--li-text));
        border-color: color-mix(in srgb, var(--li-warn) 26%, transparent);
      }

      .low {
        background: color-mix(in srgb, var(--li-low) 18%, transparent);
        color: color-mix(in srgb, var(--li-low) 46%, var(--li-text));
        border-color: color-mix(in srgb, var(--li-low) 26%, transparent);
      }

      .unknown {
        background: color-mix(in srgb, var(--li-muted) 16%, transparent);
        color: var(--li-muted);
        border-color: color-mix(in srgb, var(--li-muted) 24%, transparent);
      }
    `
  ];
}

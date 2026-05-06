import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { confidenceTone, formatConfidence } from "../utils/location";

@customElement("li-confidence-chip")
export class LiConfidenceChip extends LitElement {
  @property({ attribute: false }) confidence?: number;

  protected render() {
    return html`<span class="chip ${confidenceTone(this.confidence)}">
      ${formatConfidence(this.confidence)}
    </span>`;
  }

  static styles = css`
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
      background: rgba(92, 137, 104, 0.16);
      color: #234a2f;
      border-color: rgba(92, 137, 104, 0.22);
    }

    .medium {
      background: rgba(165, 101, 42, 0.14);
      color: #7b4d1f;
      border-color: rgba(165, 101, 42, 0.24);
    }

    .low {
      background: rgba(163, 71, 60, 0.14);
      color: #7d2f2a;
      border-color: rgba(163, 71, 60, 0.24);
    }

    .unknown {
      background: rgba(85, 101, 100, 0.14);
      color: #475655;
      border-color: rgba(85, 101, 100, 0.24);
    }
  `;
}


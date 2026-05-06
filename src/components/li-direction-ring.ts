import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles } from "../styles/tokens";
import { bearingToDirection } from "../utils/location";

@customElement("li-direction-ring")
export class LiDirectionRing extends LitElement {
  @property({ type: Number }) bearing?: number;
  @property({ type: Number }) confidence?: number;

  protected render() {
    const pct = Math.max(0, Math.min(100, Math.round((this.confidence ?? 0) * 100)));
    const angle = this.bearing ?? 0;
    const confidenceColor =
      pct >= 80 ? "#2f6f43" : pct >= 50 ? "#a5652a" : pct > 0 ? "#a3473c" : "#7b8a86";

    return html`
      <div
        class="ring"
        style=${`--bearing:${angle}deg; --confidence:${pct}%; --confidence-color:${confidenceColor};`}
      >
        <div class="north">N</div>
        <div class="east">E</div>
        <div class="south">S</div>
        <div class="west">W</div>
        <div class="needle"></div>
        <div class="core">
          <span>${bearingToDirection(this.bearing)}</span>
        </div>
      </div>
    `;
  }

  static styles = [
    cardStyles,
    css`
      .ring {
      position: relative;
      width: 13rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        conic-gradient(var(--confidence-color) var(--confidence), var(--li-ring-fill) 0),
        var(--li-ring-core);
        border: 1px solid var(--li-border);
        box-shadow: inset 0 0 0 14px var(--li-ring-inner-stroke);
      }

      .north,
      .east,
      .south,
      .west {
        position: absolute;
        font-size: 0.85rem;
        font-weight: 800;
        color: var(--li-muted);
      }

    .north {
      top: 0.75rem;
      left: calc(50% - 0.35rem);
    }

    .east {
      right: 0.9rem;
      top: calc(50% - 0.55rem);
    }

    .south {
      bottom: 0.75rem;
      left: calc(50% - 0.35rem);
    }

    .west {
      left: 0.9rem;
      top: calc(50% - 0.55rem);
    }

      .needle {
        position: absolute;
        inset: 14%;
        transform: rotate(var(--bearing));
      }

      .needle::before {
        content: "";
        position: absolute;
        top: 5%;
        left: calc(50% - 0.45rem);
        width: 0.9rem;
        height: 48%;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        background: linear-gradient(180deg, var(--li-accent) 0%, var(--li-accent-soft) 100%);
        filter: drop-shadow(0 6px 10px color-mix(in srgb, var(--li-accent) 30%, transparent));
      }

      .core {
        position: absolute;
        inset: 34%;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: var(--li-surface-strong);
        border: 1px solid var(--li-border);
        color: var(--li-text);
        font-size: 1.2rem;
        font-weight: 800;
        letter-spacing: 0.08em;
      }
    `
  ];
}

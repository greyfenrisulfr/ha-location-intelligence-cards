import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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

  static styles = css`
    .ring {
      position: relative;
      width: 13rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        conic-gradient(var(--confidence-color) var(--confidence), rgba(255, 255, 255, 0.15) 0),
        radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0 39%, rgba(228, 236, 229, 0.92) 40% 100%);
      border: 1px solid rgba(40, 76, 63, 0.14);
      box-shadow: inset 0 0 0 14px rgba(255, 255, 255, 0.62);
    }

    .north,
    .east,
    .south,
    .west {
      position: absolute;
      font-size: 0.85rem;
      font-weight: 800;
      color: #556564;
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
      background: linear-gradient(180deg, #284c3f 0%, #5c8968 100%);
      filter: drop-shadow(0 6px 10px rgba(40, 76, 63, 0.2));
    }

    .core {
      position: absolute;
      inset: 34%;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba(255, 252, 245, 0.95);
      border: 1px solid rgba(40, 76, 63, 0.14);
      color: #1f2a2a;
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: 0.08em;
    }
  `;
}


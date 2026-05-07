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
      pct >= 80 ? "var(--li-accent)" : pct >= 50 ? "var(--li-warn)" : pct > 0 ? "var(--li-low)" : "var(--li-muted)";

    return html`
      <div
        class="ring"
        style=${`--bearing:${angle}deg; --confidence:${pct}%; --confidence-color:${confidenceColor};`}
      >
        <div class="tick tickNorth"></div>
        <div class="tick tickSouth"></div>
        <div class="tick tickEast"></div>
        <div class="tick tickWest"></div>
        <div class="north">N</div>
        <div class="east">E</div>
        <div class="south">S</div>
        <div class="west">W</div>
        <div class="sweep"></div>
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
        width: 14rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background:
          radial-gradient(circle at center, rgba(10, 18, 26, 0) 0 38%, rgba(74, 168, 255, 0.06) 39%, rgba(10, 18, 26, 0) 46%),
          conic-gradient(from -90deg, var(--confidence-color) 0 var(--confidence), var(--li-ring-fill) 0),
          var(--li-ring-core);
        border: 1px solid var(--li-border);
        box-shadow: inset 0 0 0 14px var(--li-ring-inner-stroke), var(--li-shadow-strong);
      }

      .sweep {
        position: absolute;
        inset: 17%;
        border-radius: 50%;
        background:
          conic-gradient(
            from calc(var(--bearing) - 18deg),
            color-mix(in srgb, var(--confidence-color) 0%, transparent) 0deg,
            color-mix(in srgb, var(--confidence-color) 55%, transparent) 18deg,
            color-mix(in srgb, var(--confidence-color) 0%, transparent) 50deg
          );
        filter: blur(6px);
        opacity: 0.75;
      }

      .north,
      .east,
      .south,
      .west {
        position: absolute;
        font-size: 0.82rem;
        font-weight: 800;
        color: var(--li-muted);
      }

      .tick {
        position: absolute;
        background: var(--li-axis);
      }

      .tickNorth,
      .tickSouth {
        left: calc(50% - 0.5px);
        width: 1px;
        height: 1rem;
      }

      .tickNorth {
        top: 1rem;
      }

      .tickSouth {
        bottom: 1rem;
      }

      .tickEast,
      .tickWest {
        top: calc(50% - 0.5px);
        height: 1px;
        width: 1rem;
      }

      .tickEast {
        right: 1rem;
      }

      .tickWest {
        left: 1rem;
      }

      .north {
        top: 0.8rem;
        left: calc(50% - 0.35rem);
      }

      .east {
        right: 0.95rem;
        top: calc(50% - 0.5rem);
      }

      .south {
        bottom: 0.8rem;
        left: calc(50% - 0.35rem);
      }

      .west {
        left: 0.95rem;
        top: calc(50% - 0.5rem);
      }

      .needle {
        position: absolute;
        inset: 17%;
        transform: rotate(var(--bearing));
      }

      .needle::before {
        content: "";
        position: absolute;
        top: 1%;
        left: calc(50% - 0.55rem);
        width: 1.1rem;
        height: 50%;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        background: linear-gradient(180deg, var(--li-accent-soft) 0%, var(--li-accent) 100%);
        filter: drop-shadow(0 8px 14px rgba(26, 214, 107, 0.22));
      }

      .needle::after {
        content: "";
        position: absolute;
        bottom: 7%;
        left: calc(50% - 0.2rem);
        width: 0.4rem;
        height: 34%;
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(74, 168, 255, 0.22), rgba(74, 168, 255, 0));
      }

      .core {
        position: absolute;
        inset: 36%;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(180deg, rgba(21, 32, 44, 0.98), rgba(12, 19, 27, 0.98));
        border: 1px solid rgba(74, 168, 255, 0.18);
        color: var(--li-text);
        font-size: 1.2rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        box-shadow: 0 0 0 6px rgba(12, 19, 27, 0.78);
      }
    `
  ];
}

import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/location-intelligence-card-editor";
import "../components/li-confidence-chip";
import "../components/li-direction-ring";
import { cardStyles } from "../styles/tokens";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../types/home-assistant";
import type { LocationIntelligenceCardConfig } from "../types/location";
import {
  entityToSnapshot,
  formatAccuracy,
  formatDirection,
  formatDistance,
  formatLocationSummary,
  formatUpdated
} from "../utils/location";

@customElement("location-intelligence-compass-card")
export class LocationIntelligenceCompassCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) private config?: LocationIntelligenceCardConfig;

  public setConfig(config: LocationIntelligenceCardConfig): void {
    if (!config.entity) {
      throw new Error("location-intelligence-compass-card requires an entity");
    }

    this.config = config;
  }

  public getCardSize(): number {
    return 6;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    const editor = document.createElement("location-intelligence-card-editor") as LovelaceCardEditor & {
      mode: "single" | "multiple";
    };
    editor.mode = "single";
    return editor;
  }

  public static getStubConfig(): LocationIntelligenceCardConfig {
    return {
      type: "custom:location-intelligence-compass-card",
      entity: "sensor.subject_status"
    };
  }

  protected render() {
    const entity = this.config?.entity ? this.hass?.states[this.config.entity] : undefined;
    if (!entity) {
      return html`<ha-card><div class="empty">Entity unavailable</div></ha-card>`;
    }

    const snapshot = entityToSnapshot(entity);

    return html`
      <ha-card>
        <div class="card">
          <div class="titleBar">
            <div>
              <div class="eyebrow">Compass</div>
              <h2>${this.config?.name ?? snapshot.name}</h2>
            </div>
            <span class="iconChip">${snapshot.subjectTypeLabel}</span>
          </div>

          <section class="subject panel">
            <div class="avatar">${snapshot.name.slice(0, 1).toUpperCase()}</div>
            <div class="subjectCopy">
              <strong>${snapshot.name}</strong>
              <span>${formatUpdated(snapshot.lastReported)}</span>
            </div>
            <li-confidence-chip .confidence=${snapshot.confidence}></li-confidence-chip>
          </section>

          <section class="hero panel">
            <div class="ringWrap">
              <li-direction-ring
                .bearing=${snapshot.bearingDeg}
                .confidence=${snapshot.confidence}
              ></li-direction-ring>
            </div>

            <div class="summaryCard">
              <div class="summaryHeader">
                <span class="eyebrow">Direction</span>
                <span class="miniTab">Overview</span>
              </div>
              <div class="bearingLine">
                <strong>${snapshot.bearingDeg !== undefined ? `${Math.round(snapshot.bearingDeg)}deg` : "--"}</strong>
                <span>${formatDirection(snapshot)}</span>
              </div>
              <p>${formatLocationSummary(snapshot)}</p>
            </div>
          </section>

          <section class="stats">
            <div class="stat panel">
              <span>Distance</span>
              <strong>${formatDistance(snapshot.distanceM)}</strong>
              <small>${snapshot.referencePlaceName ?? "Relative to your reference place"}</small>
            </div>
            <div class="stat panel">
              <span>Confidence</span>
              <strong>${snapshot.confidenceLabel ?? "Estimated"}</strong>
              <small>${snapshot.sourceLabel ?? "Derived from current sources"}</small>
            </div>
            <div class="stat panel">
              <span>Updated</span>
              <strong>${formatUpdated(snapshot.lastReported)}</strong>
              <small>${snapshot.isAvailable ? "Live" : "Not currently available"}</small>
            </div>
            <div class="stat panel">
              <span>Uncertainty</span>
              <strong>${formatAccuracy(snapshot.accuracyM)}</strong>
              <small>${snapshot.likelyLocation ?? "Probable location area"}</small>
            </div>
          </section>

          <section class="detail panel">
            <div class="detailHeader">
              <div>
                <div class="eyebrow">Selected</div>
                <h3>${snapshot.name}</h3>
              </div>
              ${snapshot.state ? html`<span class="chip">${snapshot.stateLabel}</span>` : nothing}
            </div>
            <div class="detailGrid">
              <div>
                <span>Direction</span>
                <strong>${formatDirection(snapshot)}</strong>
              </div>
              <div>
                <span>Distance</span>
                <strong>${formatDistance(snapshot.distanceM)}</strong>
              </div>
              <div>
                <span>Place</span>
                <strong>${snapshot.likelyLocation ?? snapshot.referencePlaceName ?? "Unknown"}</strong>
              </div>
              <div>
                <span>Source</span>
                <strong>${snapshot.sourceLabel ?? snapshot.confidenceLabel ?? "Not classified"}</strong>
              </div>
            </div>
          </section>

          <div class="footer">
            <span class="chip">${formatAccuracy(snapshot.accuracyM)}</span>
            ${snapshot.lastReported ? html`<span class="chip">Seen ${formatUpdated(snapshot.lastReported)}</span>` : nothing}
            ${snapshot.state ? html`<span class="chip">${snapshot.stateLabel}</span>` : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    cardStyles,
    css`
      .card {
        padding: 1.15rem;
      }

      .titleBar,
      .subject,
      .detailHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.9rem;
      }

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      h2 {
        font-size: 1.45rem;
      }

      .iconChip,
      .miniTab {
        display: inline-flex;
        align-items: center;
        padding: 0.3rem 0.72rem;
        border-radius: 999px;
        background: color-mix(in srgb, var(--li-accent) 12%, transparent);
        color: var(--li-accent-soft);
        border: 1px solid color-mix(in srgb, var(--li-accent) 18%, transparent);
        font-size: 0.78rem;
        font-weight: 700;
      }

      .subject {
        margin-top: 0.9rem;
        padding: 0.9rem 1rem;
      }

      .avatar {
        width: 2.5rem;
        height: 2.5rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--li-warn) 24%, transparent),
          color-mix(in srgb, var(--li-info) 20%, transparent)
        );
        border: 1px solid color-mix(in srgb, var(--li-text) 10%, transparent);
        font-weight: 800;
      }

      .subjectCopy {
        flex: 1;
      }

      .subjectCopy strong,
      .subjectCopy span {
        display: block;
      }

      .subjectCopy span,
      .summaryCard p,
      .stat small,
      .detailGrid span {
        color: var(--li-muted);
      }

      .hero {
        margin-top: 1rem;
        padding: 1rem;
        display: grid;
        gap: 1rem;
      }

      .ringWrap {
        position: relative;
        display: grid;
        place-items: center;
        padding: 1.2rem 0.8rem;
        border-radius: 22px;
        background:
          radial-gradient(circle at center, color-mix(in srgb, var(--li-accent) 12%, transparent) 0, transparent 55%),
          var(--li-grid);
        background-size: auto, 1.1rem 1.1rem;
        background-color: color-mix(in srgb, var(--li-surface-muted) 82%, transparent);
        box-shadow: var(--li-glow);
      }

      .summaryCard {
        padding: 1rem;
        border-radius: 18px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .summaryHeader {
        display: flex;
        justify-content: space-between;
        gap: 0.6rem;
        align-items: center;
      }

      .bearingLine {
        display: flex;
        align-items: baseline;
        gap: 0.7rem;
        margin-top: 0.8rem;
      }

      .bearingLine strong {
        font-size: 2rem;
        line-height: 1;
      }

      .bearingLine span {
        color: var(--li-accent-soft);
        font-weight: 700;
      }

      .summaryCard p {
        margin: 0.85rem 0 0;
        line-height: 1.5;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
        margin-top: 1rem;
      }

      .stat {
        padding: 1rem;
      }

      .stat span,
      .detailGrid span {
        display: block;
        font-size: 0.76rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .stat strong,
      .detailGrid strong {
        display: block;
        margin-top: 0.35rem;
        font-size: 1.18rem;
      }

      .stat small {
        display: block;
        margin-top: 0.45rem;
        font-size: 0.8rem;
      }

      .detail {
        margin-top: 1rem;
        padding: 1rem;
      }

      .detailGrid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
        margin-top: 0.9rem;
      }

      .detailGrid div {
        padding: 0.9rem;
        border-radius: 16px;
        background: var(--li-surface-muted);
        border: 1px solid var(--li-border);
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-top: 1rem;
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 640px) {
        .stats,
        .detailGrid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "location-intelligence-compass-card": LocationIntelligenceCompassCard;
  }
}

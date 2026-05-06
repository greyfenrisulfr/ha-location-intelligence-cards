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
    return 5;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    const editor = document.createElement("location-intelligence-card-editor") as LovelaceCardEditor &
      {
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
          <div class="header">
            <div>
              <div class="eyebrow">${snapshot.subjectTypeLabel}</div>
              <h2>${this.config?.name ?? snapshot.name}</h2>
              <p>${formatLocationSummary(snapshot)}</p>
            </div>
            <li-confidence-chip .confidence=${snapshot.confidence}></li-confidence-chip>
          </div>

          <div class="hero panel">
            <li-direction-ring
              .bearing=${snapshot.bearingDeg}
              .confidence=${snapshot.confidence}
            ></li-direction-ring>

            <div class="metrics">
              <div class="metric">
                <span class="label">Direction</span>
                <strong>${formatDirection(snapshot)}</strong>
              </div>
              <div class="metric">
                <span class="label">Distance</span>
                <strong>${formatDistance(snapshot.distanceM)}</strong>
              </div>
              <div class="metric">
                <span class="label">Place</span>
                <strong>${snapshot.likelyLocation ?? snapshot.referencePlaceName ?? "Unknown"}</strong>
              </div>
              <div class="metric">
                <span class="label">Source</span>
                <strong>${snapshot.sourceLabel ?? snapshot.confidenceLabel ?? "Not classified"}</strong>
              </div>
            </div>
          </div>

          <div class="footer">
            <span class="chip">Updated ${formatUpdated(snapshot.lastReported)}</span>
            <span class="chip">${formatAccuracy(snapshot.accuracyM)}</span>
            ${snapshot.state
              ? html`<span class="chip">${snapshot.isAvailable ? "State" : "Availability"} ${snapshot.stateLabel}</span>`
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    cardStyles,
    css`
      .card {
        padding: 1.25rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: start;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.7rem;
        line-height: 1.1;
      }

      p {
        margin: 0.5rem 0 0;
        color: var(--li-muted);
        max-width: 32ch;
      }

      .hero {
        margin-top: 1rem;
        padding: 1rem;
        display: grid;
        grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
        gap: 1rem;
        align-items: center;
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.85rem;
      }

      .metric {
        padding: 0.95rem;
        border-radius: 16px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .label {
        display: block;
        color: var(--li-muted);
        font-size: 0.76rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      strong {
        display: block;
        margin-top: 0.3rem;
        font-size: 1rem;
        line-height: 1.3;
      }

      .footer {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 640px) {
        .hero {
          grid-template-columns: 1fr;
          justify-items: center;
        }

        .metrics {
          width: 100%;
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

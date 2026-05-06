import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/location-intelligence-card-editor";
import "../components/li-confidence-chip";
import { cardStyles } from "../styles/tokens";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../types/home-assistant";
import type { LocationIntelligenceCardConfig } from "../types/location";
import {
  bearingToDirection,
  entityToSnapshot,
  formatDistance,
  formatLocationSummary
} from "../utils/location";

@customElement("location-intelligence-dashboard-card")
export class LocationIntelligenceDashboardCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) private config?: LocationIntelligenceCardConfig;

  public setConfig(config: LocationIntelligenceCardConfig): void {
    if (!config.entities?.length) {
      throw new Error("location-intelligence-dashboard-card requires entities");
    }

    this.config = config;
  }

  public getCardSize(): number {
    return 8;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    const editor = document.createElement("location-intelligence-card-editor") as LovelaceCardEditor &
      {
        mode: "single" | "multiple";
      };
    editor.mode = "multiple";
    return editor;
  }

  public static getStubConfig(): LocationIntelligenceCardConfig {
    return {
      type: "custom:location-intelligence-dashboard-card",
      title: "Spatial awareness",
      focus_entity: "sensor.location_intelligence",
      entities: ["sensor.location_intelligence"]
    };
  }

  protected render() {
    const snapshots = (this.config?.entities ?? [])
      .map((entityId) => this.hass?.states[entityId])
      .filter((entity): entity is NonNullable<typeof entity> => Boolean(entity))
      .map(entityToSnapshot);

    const focus =
      snapshots.find((snapshot) => snapshot.entityId === this.config?.focus_entity) ?? snapshots[0];

    return html`
      <ha-card>
        <div class="card">
          <div class="heading">
            <div>
              <div class="eyebrow">Dashboard</div>
              <h2>${this.config?.title ?? "Spatial awareness"}</h2>
            </div>
          </div>

          ${focus
            ? html`
                <div class="layout">
                  <section class="focus panel">
                    <div class="focusTop">
                      <div>
                        <div class="eyebrow">${focus.subjectType}</div>
                        <h3>${focus.name}</h3>
                        <p>${formatLocationSummary(focus)}</p>
                      </div>
                      <li-confidence-chip .confidence=${focus.confidence}></li-confidence-chip>
                    </div>

                    <div class="focusStats">
                      <div>
                        <span>Distance</span>
                        <strong>${formatDistance(focus.distanceM)}</strong>
                      </div>
                      <div>
                        <span>Direction</span>
                        <strong>${bearingToDirection(focus.bearingDeg)}</strong>
                      </div>
                      <div>
                        <span>Likely place</span>
                        <strong>${focus.likelyLocation ?? "Unknown"}</strong>
                      </div>
                    </div>
                  </section>

                  <section class="map panel">
                    <div class="eyebrow">Map surface</div>
                    <h3>Desktop map placeholder</h3>
                    <p>
                      Reserve this area for a future fused-position map, trail view, or leader/follower
                      relative layout.
                    </p>
                    <div class="grid">
                      ${snapshots.map(
                        (snapshot) => html`
                          <article>
                            <strong>${snapshot.name}</strong>
                            <span>${snapshot.likelyLocation ?? "Unknown place"}</span>
                            <span>${formatDistance(snapshot.distanceM)}</span>
                          </article>
                        `
                      )}
                    </div>
                  </section>
                </div>
              `
            : html`<div class="empty">No configured entities are currently available.</div>`}
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

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .focus,
      .map {
        padding: 1rem;
      }

      .focusTop {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: start;
      }

      p {
        color: var(--li-muted);
      }

      .focusStats {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.8rem;
      }

      .focusStats div,
      article {
        padding: 0.9rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid var(--li-border);
      }

      .focusStats span,
      article span {
        display: block;
        color: var(--li-muted);
        font-size: 0.82rem;
      }

      .focusStats strong,
      article strong {
        display: block;
        margin-top: 0.3rem;
      }

      .grid {
        display: grid;
        gap: 0.7rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: 1rem;
      }

      .empty {
        padding: 1rem 0;
      }

      @media (max-width: 900px) {
        .layout,
        .focusStats,
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "location-intelligence-dashboard-card": LocationIntelligenceDashboardCard;
  }
}

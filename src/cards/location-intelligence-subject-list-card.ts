import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/location-intelligence-card-editor";
import "../components/li-confidence-chip";
import { cardStyles } from "../styles/tokens";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../types/home-assistant";
import type { LocationIntelligenceCardConfig } from "../types/location";
import {
  entityToSnapshot,
  formatDirection,
  formatDistance,
  formatUpdated,
  sortSnapshots
} from "../utils/location";

@customElement("location-intelligence-subject-list-card")
export class LocationIntelligenceSubjectListCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) private config?: LocationIntelligenceCardConfig;

  public setConfig(config: LocationIntelligenceCardConfig): void {
    if (!config.entities?.length) {
      throw new Error("location-intelligence-subject-list-card requires entities");
    }

    this.config = config;
  }

  public getCardSize(): number {
    return Math.max(4, this.config?.entities?.length ?? 4);
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    const editor = document.createElement("location-intelligence-card-editor") as LovelaceCardEditor & {
      mode: "single" | "multiple";
    };
    editor.mode = "multiple";
    return editor;
  }

  public static getStubConfig(): LocationIntelligenceCardConfig {
    return {
      type: "custom:location-intelligence-subject-list-card",
      title: "Location overview",
      entities: ["sensor.subject_status"]
    };
  }

  protected render() {
    const configuredCount = this.config?.entities?.length ?? 0;
    const entities = sortSnapshots(
      (this.config?.entities ?? [])
        .map((entityId) => this.hass?.states[entityId])
        .filter((entity): entity is NonNullable<typeof entity> => Boolean(entity))
        .map(entityToSnapshot)
    );
    const missingCount = Math.max(0, configuredCount - entities.length);

    return html`
      <ha-card>
        <div class="card">
          <div class="header">
            <div>
              <div class="eyebrow">Overview</div>
              <h2>${this.config?.title ?? "Location overview"}</h2>
            </div>
            <div class="headerMeta">
              <span class="miniTab miniTabActive">Tracked</span>
              <span class="chip">${entities.length} active</span>
            </div>
          </div>

          ${missingCount > 0
            ? html`<p class="notice">${missingCount} configured ${missingCount === 1 ? "entity is" : "entities are"} currently unavailable.</p>`
            : ""}

          <div class="table">
            <div class="tableHead">
              <span>Subject</span>
              <span>Distance</span>
              <span>Direction</span>
              <span>Location</span>
              <span>Updated</span>
            </div>

            ${entities.length > 0
              ? entities.map(
                  (snapshot) => html`
                    <article class="row panel">
                      <div class="subject">
                        <span class="avatar">${snapshot.name.slice(0, 1).toUpperCase()}</span>
                        <div>
                          <strong>${snapshot.name}</strong>
                          <small>${snapshot.subjectTypeLabel}</small>
                        </div>
                      </div>
                      <div class="value">
                        <strong>${formatDistance(snapshot.distanceM)}</strong>
                      </div>
                      <div class="value">
                        <strong>${formatDirection(snapshot)}</strong>
                      </div>
                      <div class="locationCell">
                        <span>${snapshot.likelyLocation ?? snapshot.referencePlaceName ?? "Location unknown"}</span>
                        <li-confidence-chip .confidence=${snapshot.confidence}></li-confidence-chip>
                      </div>
                      <div class="value">
                        <strong>${formatUpdated(snapshot.lastReported)}</strong>
                      </div>
                    </article>
                  `
                )
              : html`<div class="empty panel">No configured entities are currently available.</div>`}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    cardStyles,
    css`
      .card {
        padding: 1.1rem;
      }

      .header,
      .headerMeta,
      .subject,
      .locationCell {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .header {
        justify-content: space-between;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.35rem;
      }

      .miniTab {
        padding: 0.42rem 0.78rem;
        border-radius: 999px;
        font-size: 0.78rem;
        background: var(--li-surface-muted);
        border: 1px solid var(--li-border);
        color: var(--li-muted);
      }

      .miniTabActive {
        color: var(--li-accent-soft);
        background: color-mix(in srgb, var(--li-accent) 14%, transparent);
      }

      .notice,
      .tableHead span,
      small,
      .locationCell span {
        color: var(--li-muted);
      }

      .notice {
        margin: 0.7rem 0 0;
        font-size: 0.88rem;
      }

      .table {
        margin-top: 1rem;
      }

      .tableHead,
      .row {
        display: grid;
        grid-template-columns: 1.35fr 0.9fr 0.8fr 1.4fr 0.95fr;
        gap: 0.8rem;
        align-items: center;
      }

      .tableHead {
        padding: 0 0.45rem 0.55rem;
        font-size: 0.78rem;
      }

      .row {
        padding: 0.85rem 1rem;
      }

      .row + .row {
        margin-top: 0.5rem;
      }

      .avatar {
        width: 2rem;
        height: 2rem;
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

      strong {
        display: block;
      }

      .locationCell {
        justify-content: space-between;
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 860px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
        }

        .tableHead,
        .row {
          grid-template-columns: 1fr;
        }

        .locationCell {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "location-intelligence-subject-list-card": LocationIntelligenceSubjectListCard;
  }
}

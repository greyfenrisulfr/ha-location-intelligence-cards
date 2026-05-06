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
    return Math.max(3, this.config?.entities?.length ?? 3);
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
          <div class="titleRow">
            <div>
              <div class="eyebrow">Subjects</div>
              <h2>${this.config?.title ?? "Location overview"}</h2>
            </div>
            <span class="count chip">${entities.length} active</span>
          </div>

          ${missingCount > 0
            ? html`<p class="notice">${missingCount} configured ${missingCount === 1 ? "entity is" : "entities are"} currently unavailable.</p>`
            : ""}

          <div class="list">
            ${entities.length > 0
              ? entities.map(
                  (snapshot) => html`
                    <div class="row panel">
                      <div class="identity">
                        <strong>${snapshot.name}</strong>
                        <span>${snapshot.subjectTypeLabel}</span>
                      </div>

                      <div class="summary">
                        <span>${formatDistance(snapshot.distanceM)}</span>
                        <span>${formatDirection(snapshot)}</span>
                        <span>${snapshot.likelyLocation ?? snapshot.referencePlaceName ?? "Location unknown"}</span>
                      </div>

                      <div class="meta">
                        <li-confidence-chip .confidence=${snapshot.confidence}></li-confidence-chip>
                        <span class="stamp">${formatUpdated(snapshot.lastReported)}</span>
                      </div>
                    </div>
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
        padding: 1.25rem;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.5rem;
      }

      .titleRow {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 1rem;
      }

      .notice {
        margin: 0.75rem 0 0;
        color: var(--li-muted);
        font-size: 0.88rem;
      }

      .list {
        display: grid;
        gap: 0.8rem;
        margin-top: 1rem;
      }

      .row {
        padding: 0.9rem 1rem;
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.3fr) auto;
        gap: 0.9rem;
        align-items: center;
      }

      .identity strong {
        display: block;
        font-size: 1rem;
      }

      .identity span,
      .summary span,
      .stamp {
        color: var(--li-muted);
        font-size: 0.86rem;
      }

      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .summary span {
        padding: 0.28rem 0.55rem;
        border-radius: 999px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: 0.7rem;
      }

      .empty {
        padding: 1rem;
        color: var(--li-muted);
      }

      @media (max-width: 760px) {
        .row {
          grid-template-columns: 1fr;
        }

        .meta {
          justify-content: space-between;
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

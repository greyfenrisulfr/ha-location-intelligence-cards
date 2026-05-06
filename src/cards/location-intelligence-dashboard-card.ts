import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/location-intelligence-card-editor";
import "../components/li-confidence-chip";
import "../components/li-direction-ring";
import { cardStyles } from "../styles/tokens";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../types/home-assistant";
import type { LocationIntelligenceCardConfig, LocationSnapshot } from "../types/location";
import {
  entityToSnapshot,
  formatAccuracy,
  formatDirection,
  formatDistance,
  formatLocationSummary,
  formatUpdated,
  sortSnapshots
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
    return 9;
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
      type: "custom:location-intelligence-dashboard-card",
      title: "Spatial awareness",
      focus_entity: "sensor.subject_status",
      entities: ["sensor.subject_status"]
    };
  }

  protected render() {
    const snapshots = sortSnapshots(
      (this.config?.entities ?? [])
        .map((entityId) => this.hass?.states[entityId])
        .filter((entity): entity is NonNullable<typeof entity> => Boolean(entity))
        .map(entityToSnapshot)
    );
    const configuredCount = this.config?.entities?.length ?? 0;
    const missingCount = Math.max(0, configuredCount - snapshots.length);
    const focus =
      snapshots.find((snapshot) => snapshot.entityId === this.config?.focus_entity) ?? snapshots[0];

    if (!focus) {
      return html`
        <ha-card>
          <div class="card">
            <div class="heading">
              <div>
                <div class="eyebrow">Dashboard</div>
                <h2>${this.config?.title ?? "Spatial awareness"}</h2>
              </div>
            </div>
            <div class="empty">No configured entities are currently available.</div>
          </div>
        </ha-card>
      `;
    }

    const availableCount = snapshots.filter((snapshot) => snapshot.isAvailable).length;
    const confidenceValues = snapshots
      .map((snapshot) => snapshot.confidence)
      .filter((value): value is number => value !== undefined);
    const averageConfidence =
      confidenceValues.length > 0
        ? Math.round(
            (confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length) * 100
          )
        : undefined;
    const distinctPlaces = new Set(
      snapshots
        .map((snapshot) => snapshot.likelyLocation ?? snapshot.referencePlaceName)
        .filter((value): value is string => Boolean(value))
    ).size;
    const maxDistance = Math.max(
      ...snapshots.map((snapshot) => snapshot.distanceM ?? 0),
      1
    );

    return html`
      <ha-card>
        <div class="card">
          <div class="heading">
            <div>
              <div class="eyebrow">Dashboard</div>
              <h2>${this.config?.title ?? "Spatial awareness"}</h2>
            </div>
            <span class="chip">${availableCount}/${configuredCount} active</span>
          </div>

          ${missingCount > 0
            ? html`<p class="notice">${missingCount} configured ${missingCount === 1 ? "entity is" : "entities are"} currently unavailable.</p>`
            : ""}

          <div class="layout">
            <section class="focus panel">
              <div class="focusTop">
                <div class="focusCopy">
                  <div class="eyebrow">${focus.subjectTypeLabel}</div>
                  <h3>${focus.name}</h3>
                  <p>${formatLocationSummary(focus)}</p>
                </div>
                <li-confidence-chip .confidence=${focus.confidence}></li-confidence-chip>
              </div>

              <div class="focusBody">
                <li-direction-ring
                  .bearing=${focus.bearingDeg}
                  .confidence=${focus.confidence}
                ></li-direction-ring>

                <div class="focusStats">
                  <div>
                    <span>Direction</span>
                    <strong>${formatDirection(focus)}</strong>
                  </div>
                  <div>
                    <span>Distance</span>
                    <strong>${formatDistance(focus.distanceM)}</strong>
                  </div>
                  <div>
                    <span>Place</span>
                    <strong>${focus.likelyLocation ?? focus.referencePlaceName ?? "Unknown"}</strong>
                  </div>
                  <div>
                    <span>Updated</span>
                    <strong>${formatUpdated(focus.lastReported)}</strong>
                  </div>
                  <div>
                    <span>Accuracy</span>
                    <strong>${formatAccuracy(focus.accuracyM)}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>${focus.stateLabel}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section class="overview panel">
              <div class="eyebrow">Fleet overview</div>
              <h3>Coverage snapshot</h3>

              <div class="kpis">
                <article>
                  <span>Tracked</span>
                  <strong>${snapshots.length}</strong>
                </article>
                <article>
                  <span>Available</span>
                  <strong>${availableCount}</strong>
                </article>
                <article>
                  <span>Places</span>
                  <strong>${distinctPlaces}</strong>
                </article>
                <article>
                  <span>Avg confidence</span>
                  <strong>${averageConfidence !== undefined ? `${averageConfidence}%` : "Unknown"}</strong>
                </article>
              </div>

              <div class="plot">
                <div class="plotLabel">Relative bearing and distance</div>
                <div class="radar">
                  <div class="ring ringOuter"></div>
                  <div class="ring ringInner"></div>
                  <div class="axis axisVertical"></div>
                  <div class="axis axisHorizontal"></div>
                  ${snapshots.map((snapshot, index) => this.renderRadarPoint(snapshot, index, maxDistance))}
                </div>
              </div>
            </section>
          </div>

          <section class="roster panel">
            <div class="rosterHeader">
              <div>
                <div class="eyebrow">Subjects</div>
                <h3>Current positions</h3>
              </div>
            </div>

            <div class="rows">
              ${snapshots.map(
                (snapshot) => html`
                  <article class="row ${snapshot.entityId === focus.entityId ? "rowFocus" : ""}">
                    <div class="identity">
                      <strong>${snapshot.name}</strong>
                      <span>${snapshot.subjectTypeLabel}</span>
                    </div>
                    <div class="summary">
                      <span>${snapshot.likelyLocation ?? snapshot.referencePlaceName ?? "Location unknown"}</span>
                      <span>${formatDistance(snapshot.distanceM)}</span>
                      <span>${formatDirection(snapshot)}</span>
                    </div>
                    <div class="meta">
                      <li-confidence-chip .confidence=${snapshot.confidence}></li-confidence-chip>
                      <span class="stamp">${formatUpdated(snapshot.lastReported)}</span>
                    </div>
                  </article>
                `
              )}
            </div>
          </section>
        </div>
      </ha-card>
    `;
  }

  private renderRadarPoint(snapshot: LocationSnapshot, index: number, maxDistance: number) {
    const normalizedDistance =
      snapshot.distanceM !== undefined ? Math.min(snapshot.distanceM / maxDistance, 1) : 0.12 + index * 0.08;
    const radius = normalizedDistance * 42;
    const angleDeg = (snapshot.bearingDeg ?? index * 57) - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = 50 + Math.cos(angleRad) * radius;
    const y = 50 + Math.sin(angleRad) * radius;
    const opacity = snapshot.isAvailable ? 1 : 0.5;

    return html`
      <div
        class="point"
        title=${`${snapshot.name}: ${snapshot.likelyLocation ?? snapshot.referencePlaceName ?? "Unknown place"}`}
        style=${`left:${x}%; top:${y}%; opacity:${opacity};`}
      >
        <span>${snapshot.name.slice(0, 1).toUpperCase()}</span>
      </div>
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

      .heading,
      .rosterHeader {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 1rem;
      }

      .notice,
      p {
        color: var(--li-muted);
      }

      .notice {
        margin: 0.75rem 0 0;
        font-size: 0.88rem;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .focus,
      .overview,
      .roster {
        padding: 1rem;
      }

      .focusTop {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: start;
      }

      .focusCopy p {
        margin-bottom: 0;
        max-width: 36ch;
      }

      .focusBody {
        display: grid;
        grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
      }

      .focusStats,
      .kpis,
      .rows {
        display: grid;
        gap: 0.8rem;
      }

      .focusStats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .focusStats div,
      .kpis article,
      .row {
        padding: 0.9rem;
        border-radius: 16px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .focusStats span,
      .kpis span,
      .identity span,
      .summary span,
      .stamp,
      .plotLabel {
        display: block;
        color: var(--li-muted);
        font-size: 0.82rem;
      }

      .focusStats strong,
      .kpis strong,
      .identity strong {
        display: block;
        margin-top: 0.3rem;
      }

      .kpis {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: 1rem;
      }

      .plot {
        margin-top: 1rem;
      }

      .radar {
        position: relative;
        aspect-ratio: 1;
        margin-top: 0.75rem;
        border-radius: 24px;
        background:
          radial-gradient(circle at center, var(--li-surface-strong) 0 18%, transparent 19%),
          linear-gradient(180deg, var(--li-surface), color-mix(in srgb, var(--li-surface) 72%, transparent));
        border: 1px solid var(--li-border);
        overflow: hidden;
      }

      .ring,
      .axis {
        position: absolute;
      }

      .ring {
        border-radius: 50%;
        border: 1px dashed var(--li-dashed-border);
      }

      .ringOuter {
        inset: 10%;
      }

      .ringInner {
        inset: 28%;
      }

      .axisVertical {
        top: 8%;
        bottom: 8%;
        left: calc(50% - 0.5px);
        width: 1px;
        background: var(--li-axis);
      }

      .axisHorizontal {
        left: 8%;
        right: 8%;
        top: calc(50% - 0.5px);
        height: 1px;
        background: var(--li-axis);
      }

      .point {
        position: absolute;
        width: 2rem;
        height: 2rem;
        margin-left: -1rem;
        margin-top: -1rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, #284c3f 0%, #5c8968 100%);
        color: white;
        font-size: 0.82rem;
        font-weight: 800;
        border: 2px solid var(--li-point-border);
        box-shadow: var(--li-shadow-strong);
      }

      .roster {
        margin-top: 1rem;
      }

      .rows {
        margin-top: 1rem;
      }

      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) auto;
        gap: 0.9rem;
        align-items: center;
      }

      .rowFocus {
        background: var(--li-surface-strong);
        border-color: color-mix(in srgb, var(--li-accent-soft) 26%, transparent);
      }

      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
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
        padding: 1rem 0;
      }

      @media (max-width: 900px) {
        .layout,
        .focusBody,
        .focusStats,
        .kpis,
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
    "location-intelligence-dashboard-card": LocationIntelligenceDashboardCard;
  }
}

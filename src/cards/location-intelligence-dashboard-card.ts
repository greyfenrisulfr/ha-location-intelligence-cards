import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/location-intelligence-card-editor";
import "../components/li-confidence-chip";
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
    return 10;
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
            <div class="toolbar">
              <div>
                <div class="eyebrow">Location Intelligence</div>
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
    const maxDistance = Math.max(...snapshots.map((snapshot) => snapshot.distanceM ?? 0), 1);

    return html`
      <ha-card>
        <div class="card">
          <div class="toolbar">
            <div class="brand">
              <div class="brandMark"></div>
              <div>
                <div class="eyebrow">Location Intelligence</div>
                <h2>${this.config?.title ?? "Spatial awareness"}</h2>
              </div>
            </div>

            <div class="toolbarRight">
              <div class="navTabs">
                <span class="navTab navTabActive">Overview</span>
                <span class="navTab">Map</span>
                <span class="navTab">History</span>
              </div>
              <span class="chip">${availableCount}/${configuredCount} active</span>
            </div>
          </div>

          ${missingCount > 0
            ? html`<p class="notice">${missingCount} configured ${missingCount === 1 ? "entity is" : "entities are"} currently unavailable.</p>`
            : ""}

          <div class="workspace">
            <section class="mapStage panel">
              <div class="mapHeader">
                <div>
                  <div class="eyebrow">Map</div>
                  <h3>Live relative view</h3>
                </div>
                <div class="miniTabs">
                  <span class="miniTab miniTabActive">All</span>
                  <span class="miniTab">People</span>
                  <span class="miniTab">Places</span>
                </div>
              </div>

              <div class="mapCanvas">
                <div class="mapGlow"></div>
                <div class="mapCenter">
                  <span>You</span>
                </div>
                <div class="mapRing mapRingOne"></div>
                <div class="mapRing mapRingTwo"></div>
                <div class="mapAxis mapAxisVertical"></div>
                <div class="mapAxis mapAxisHorizontal"></div>
                ${snapshots.map((snapshot, index) => this.renderTrack(snapshot, index, maxDistance))}
              </div>

              <div class="dataTable">
                <div class="tableHead">
                  <span>Tracked</span>
                  <span>Distance</span>
                  <span>Direction</span>
                  <span>Confidence</span>
                  <span>Updated</span>
                </div>
                ${snapshots.map(
                  (snapshot) => html`
                    <article class="tableRow ${snapshot.entityId === focus.entityId ? "tableRowFocus" : ""}">
                      <div class="trackCell">
                        <span class="avatar">${snapshot.name.slice(0, 1).toUpperCase()}</span>
                        <div>
                          <strong>${snapshot.name}</strong>
                          <small>${snapshot.subjectTypeLabel}</small>
                        </div>
                      </div>
                      <span>${formatDistance(snapshot.distanceM)}</span>
                      <span>${formatDirection(snapshot)}</span>
                      <span>${snapshot.confidenceLabel ?? "Estimated"}</span>
                      <span>${formatUpdated(snapshot.lastReported)}</span>
                    </article>
                  `
                )}
              </div>
            </section>

            <aside class="detailRail panel">
              <div class="detailSubject">
                <span class="avatar avatarLarge">${focus.name.slice(0, 1).toUpperCase()}</span>
                <div>
                  <h3>${focus.name}</h3>
                  <p>${formatLocationSummary(focus)}</p>
                </div>
              </div>

              <div class="miniTabs">
                <span class="miniTab miniTabActive">Overview</span>
                <span class="miniTab">History</span>
                <span class="miniTab">Details</span>
              </div>

              <section class="directionCard">
                <div class="eyebrow">Direction (from you)</div>
                <div class="directionLine">
                  <strong>${focus.bearingDeg !== undefined ? `${Math.round(focus.bearingDeg)}deg` : "--"}</strong>
                  <span>${formatDirection(focus)}</span>
                </div>
                <div class="cone">
                  <div class="coneArc"></div>
                  <div class="coneDot">${focus.name.slice(0, 1).toUpperCase()}</div>
                  <div class="coneNeedle"></div>
                </div>
              </section>

              <div class="detailStats">
                <article>
                  <span>Distance</span>
                  <strong>${formatDistance(focus.distanceM)}</strong>
                  <small>${focus.referencePlaceName ?? "Relative estimate"}</small>
                </article>
                <article>
                  <span>Confidence</span>
                  <strong>${focus.confidenceLabel ?? "Estimated"}</strong>
                  <small>${averageConfidence !== undefined ? `${averageConfidence}/100 average` : "No aggregate"}</small>
                </article>
                <article>
                  <span>Updated</span>
                  <strong>${formatUpdated(focus.lastReported)}</strong>
                  <small>${focus.isAvailable ? "Live" : "Unavailable"}</small>
                </article>
                <article>
                  <span>Uncertainty</span>
                  <strong>${formatAccuracy(focus.accuracyM)}</strong>
                  <small>Possible area radius</small>
                </article>
              </div>

              <section class="explain panel">
                <div class="sectionTitle">What this means</div>
                <p>${formatLocationSummary(focus)}. Move toward the center of the highlighted corridor.</p>
              </section>

              <section class="factors panel">
                <div class="sectionTitle">Main factors</div>
                <div class="factorList">
                  ${this.renderFactor("GPS accuracy", formatAccuracy(focus.accuracyM))}
                  ${this.renderFactor("Last update", formatUpdated(focus.lastReported))}
                  ${this.renderFactor("Sources", focus.sourceLabel ?? "Current source estimate")}
                  ${this.renderFactor("Status", focus.stateLabel)}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderFactor(label: string, value: string) {
    return html`
      <div class="factor">
        <span class="factorDot"></span>
        <div class="factorBody">
          <strong>${label}</strong>
          <span>${value}</span>
        </div>
      </div>
    `;
  }

  private renderTrack(snapshot: LocationSnapshot, index: number, maxDistance: number) {
    const normalizedDistance =
      snapshot.distanceM !== undefined ? Math.min(snapshot.distanceM / maxDistance, 1) : 0.16 + index * 0.08;
    const radius = normalizedDistance * 40;
    const angleDeg = (snapshot.bearingDeg ?? index * 57) - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = 50 + Math.cos(angleRad) * radius;
    const y = 50 + Math.sin(angleRad) * radius;
    const dx = x - 50;
    const dy = y - 50;
    const length = Math.sqrt(dx * dx + dy * dy);
    const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
    const distanceLabel = formatDistance(snapshot.distanceM).replace(" away", "");

    return html`
      <div class="track" style=${`--x:${x}%; --y:${y}%;`}>
        <div class="trackLine" style=${`width:${length}%; transform: rotate(${rotation}deg);`}></div>
        <div class="trackNode">
          <span>${snapshot.name.slice(0, 1).toUpperCase()}</span>
        </div>
        <div class="trackLabel">
          <strong>${snapshot.name}</strong>
          <span>${distanceLabel}</span>
        </div>
      </div>
    `;
  }

  static styles = [
    cardStyles,
    css`
      .card {
        padding: 1.1rem;
      }

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      h2 {
        font-size: 1.3rem;
      }

      .toolbar,
      .toolbarRight,
      .brand,
      .mapHeader,
      .miniTabs,
      .detailSubject,
      .trackCell,
      .factor {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .toolbar,
      .mapHeader {
        justify-content: space-between;
      }

      .brandMark {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, var(--li-accent-soft), var(--li-accent));
        box-shadow: 0 0 18px rgba(26, 214, 107, 0.34);
      }

      .toolbarRight {
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .navTabs,
      .miniTabs {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.24rem;
        border-radius: 999px;
        background: rgba(13, 20, 28, 0.88);
        border: 1px solid var(--li-border);
      }

      .navTab,
      .miniTab {
        padding: 0.42rem 0.78rem;
        border-radius: 999px;
        font-size: 0.78rem;
        color: var(--li-muted);
      }

      .navTabActive,
      .miniTabActive {
        background: rgba(26, 214, 107, 0.16);
        color: var(--li-accent-soft);
      }

      .notice,
      p,
      small,
      .tableHead span,
      .tableRow span,
      .factorBody span {
        color: var(--li-muted);
      }

      .notice {
        margin: 0.7rem 0 0;
        font-size: 0.88rem;
      }

      .workspace {
        display: grid;
        grid-template-columns: minmax(0, 1.7fr) minmax(18rem, 0.9fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .mapStage,
      .detailRail {
        padding: 1rem;
      }

      .mapCanvas {
        position: relative;
        margin-top: 1rem;
        min-height: 23rem;
        border-radius: 24px;
        overflow: hidden;
        background:
          radial-gradient(circle at center, rgba(31, 95, 255, 0.2) 0, rgba(31, 95, 255, 0) 12%),
          radial-gradient(circle at 35% 72%, rgba(26, 214, 107, 0.1), transparent 26%),
          linear-gradient(180deg, rgba(11, 19, 30, 0.92), rgba(10, 16, 24, 0.98)),
          var(--li-grid);
        background-size: auto, auto, auto, 1.4rem 1.4rem;
        border: 1px solid rgba(74, 168, 255, 0.14);
      }

      .mapCanvas::before,
      .mapCanvas::after {
        content: "";
        position: absolute;
        inset: 0;
      }

      .mapCanvas::before {
        background:
          linear-gradient(135deg, transparent 44%, rgba(74, 168, 255, 0.08) 45%, transparent 46%),
          linear-gradient(25deg, transparent 54%, rgba(26, 214, 107, 0.06) 55%, transparent 56%);
      }

      .mapCanvas::after {
        background:
          radial-gradient(circle at 20% 28%, rgba(74, 168, 255, 0.18), transparent 18%),
          radial-gradient(circle at 77% 70%, rgba(165, 109, 255, 0.1), transparent 16%);
        pointer-events: none;
      }

      .mapGlow,
      .mapCenter,
      .mapRing,
      .mapAxis,
      .track {
        position: absolute;
      }

      .mapGlow {
        inset: 34%;
        border-radius: 50%;
        background: radial-gradient(circle at center, rgba(74, 168, 255, 0.22), transparent 65%);
      }

      .mapCenter {
        left: calc(50% - 2.2rem);
        top: calc(50% - 2.2rem);
        width: 4.4rem;
        height: 4.4rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(180deg, rgba(17, 56, 102, 0.95), rgba(17, 37, 68, 0.95));
        border: 1px solid rgba(74, 168, 255, 0.36);
        box-shadow: 0 0 0 10px rgba(31, 95, 255, 0.08);
        font-weight: 800;
      }

      .mapRing {
        border-radius: 50%;
        border: 1px dashed var(--li-dashed-border);
      }

      .mapRingOne {
        inset: 24%;
      }

      .mapRingTwo {
        inset: 10%;
      }

      .mapAxisVertical {
        top: 10%;
        bottom: 10%;
        left: calc(50% - 0.5px);
        width: 1px;
        background: var(--li-axis);
      }

      .mapAxisHorizontal {
        left: 10%;
        right: 10%;
        top: calc(50% - 0.5px);
        height: 1px;
        background: var(--li-axis);
      }

      .track {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .trackLine {
        position: absolute;
        left: 0;
        top: -1px;
        height: 2px;
        transform-origin: left center;
        background: linear-gradient(90deg, rgba(26, 214, 107, 0.65), rgba(255, 191, 60, 0.72));
      }

      .trackNode {
        position: absolute;
        left: var(--x);
        top: var(--y);
        transform: translate(-50%, -50%);
        width: 2.35rem;
        height: 2.35rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(180deg, rgba(255, 194, 111, 0.94), rgba(217, 133, 36, 0.9));
        color: #0d151d;
        font-weight: 800;
        border: 2px solid rgba(255, 255, 255, 0.18);
        box-shadow: var(--li-shadow-strong);
      }

      .trackLabel {
        position: absolute;
        left: calc(var(--x) + 1.6rem);
        top: calc(var(--y) - 0.8rem);
        min-width: 4rem;
        padding: 0.42rem 0.5rem;
        border-radius: 12px;
        background: rgba(11, 17, 24, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .trackLabel strong,
      .tableRow strong,
      .factorBody strong {
        display: block;
      }

      .dataTable {
        margin-top: 1rem;
      }

      .tableHead,
      .tableRow {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
        gap: 0.7rem;
        align-items: center;
      }

      .tableHead {
        padding: 0 0.4rem 0.55rem;
        font-size: 0.78rem;
      }

      .tableRow {
        padding: 0.75rem 0.85rem;
        border-radius: 16px;
        background: rgba(14, 22, 30, 0.74);
        border: 1px solid var(--li-border);
      }

      .tableRow + .tableRow {
        margin-top: 0.45rem;
      }

      .tableRowFocus {
        background: rgba(18, 30, 40, 0.96);
        box-shadow: var(--li-glow);
      }

      .avatar {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(180deg, rgba(255, 193, 114, 0.24), rgba(74, 168, 255, 0.2));
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-weight: 800;
      }

      .avatarLarge {
        width: 2.8rem;
        height: 2.8rem;
        font-size: 1rem;
      }

      .detailSubject {
        align-items: flex-start;
      }

      .detailSubject p {
        margin: 0.35rem 0 0;
        line-height: 1.45;
      }

      .directionCard {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 18px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .directionLine {
        display: flex;
        align-items: baseline;
        gap: 0.7rem;
        margin-top: 0.7rem;
      }

      .directionLine strong {
        font-size: 2rem;
        line-height: 1;
      }

      .directionLine span {
        color: var(--li-accent-soft);
        font-weight: 700;
      }

      .cone {
        position: relative;
        min-height: 7rem;
        margin-top: 0.85rem;
        border-radius: 16px;
        background: rgba(8, 14, 20, 0.7);
        overflow: hidden;
      }

      .coneArc {
        position: absolute;
        right: 0.9rem;
        top: 1rem;
        width: 8.4rem;
        height: 5.4rem;
        border: 2px dashed rgba(255, 191, 60, 0.55);
        border-left: none;
        border-radius: 0 100% 100% 0 / 0 100% 100% 0;
      }

      .coneNeedle {
        position: absolute;
        left: 1rem;
        top: calc(50% - 1px);
        right: 3rem;
        height: 2px;
        background: linear-gradient(90deg, var(--li-accent), rgba(255, 191, 60, 0.9));
      }

      .coneDot {
        position: absolute;
        right: 2.6rem;
        top: calc(50% - 1.15rem);
        width: 2.3rem;
        height: 2.3rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: rgba(26, 214, 107, 0.26);
        color: var(--li-accent-soft);
        border: 1px solid rgba(26, 214, 107, 0.3);
        font-weight: 800;
      }

      .detailStats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
        margin-top: 1rem;
      }

      .detailStats article,
      .explain,
      .factors {
        padding: 0.95rem;
        border-radius: 18px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .detailStats span,
      .sectionTitle {
        display: block;
        font-size: 0.76rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--li-muted);
      }

      .detailStats strong {
        display: block;
        margin-top: 0.35rem;
        font-size: 1.16rem;
      }

      .detailStats small {
        display: block;
        margin-top: 0.4rem;
      }

      .explain,
      .factors {
        margin-top: 1rem;
      }

      .explain p {
        margin: 0.7rem 0 0;
        line-height: 1.55;
      }

      .factorList {
        display: grid;
        gap: 0.8rem;
        margin-top: 0.75rem;
      }

      .factorDot {
        width: 0.52rem;
        height: 0.52rem;
        border-radius: 50%;
        background: var(--li-accent);
        box-shadow: 0 0 14px rgba(26, 214, 107, 0.34);
      }

      .empty {
        padding: 1rem 0;
      }

      @media (max-width: 980px) {
        .workspace {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        .toolbar,
        .mapHeader {
          flex-direction: column;
          align-items: flex-start;
        }

        .detailStats,
        .tableHead,
        .tableRow {
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

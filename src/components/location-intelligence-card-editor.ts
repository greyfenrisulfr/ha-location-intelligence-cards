import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HassEntity, HomeAssistant, LovelaceCardEditor } from "../types/home-assistant";
import { cardStyles } from "../styles/tokens";
import type { LocationIntelligenceCardConfig } from "../types/location";

type EditorMode = "single" | "multiple";

@customElement("location-intelligence-card-editor")
export class LocationIntelligenceCardEditorElement
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public mode: EditorMode = "single";

  @state() private config: LocationIntelligenceCardConfig = { type: "" };

  public setConfig(config: LocationIntelligenceCardConfig): void {
    this.config = { ...config };
  }

  protected render() {
    const candidates = this.getEntityCandidates();
    const selectedEntities = this.config.entities ?? [];
    const suggestedEntities = candidates
      .filter((entity) => !selectedEntities.includes(entity.entity_id))
      .slice(0, 8);

    return html`
      <div class="editor">
        <label>
          <span>Title</span>
          <input
            .value=${this.config.title ?? ""}
            @input=${this.onTextInput("title")}
            placeholder=${this.mode === "single" ? "Optional panel title" : "Location overview"}
          />
        </label>

        ${this.mode === "single"
          ? html`
              <label>
                <span>Name override</span>
                <input
                  .value=${this.config.name ?? ""}
                  @input=${this.onTextInput("name")}
                  placeholder="Optional display name"
                />
              </label>
            `
          : nothing}

        ${this.mode === "single"
          ? html`
              <label>
                <span>Entity</span>
                <input
                  list="location-intelligence-entities"
                  .value=${this.config.entity ?? ""}
                  @input=${this.onTextInput("entity")}
                  placeholder="sensor.alice_status"
                />
              </label>
            `
          : html`
              <div class="section">
                <div class="sectionHeading">
                  <span>Entities</span>
                  ${selectedEntities.length > 0
                    ? html`<small>${selectedEntities.length} selected</small>`
                    : nothing}
                </div>
                <textarea
                  @input=${this.onEntitiesInput}
                  placeholder="sensor.alice_status&#10;sensor.car_status"
                >
${selectedEntities.join("\n")}</textarea
                >
                ${selectedEntities.length > 0
                  ? html`
                      <div class="chips">
                        ${selectedEntities.map(
                          (entityId) => html`
                            <button type="button" class="entityChip active" @click=${() => this.removeEntity(entityId)}>
                              ${entityId}
                            </button>
                          `
                        )}
                      </div>
                    `
                  : nothing}
              </div>

              <label>
                <span>Focus entity</span>
                <input
                  list="location-intelligence-entities"
                  .value=${this.config.focus_entity ?? ""}
                  @input=${this.onTextInput("focus_entity")}
                  placeholder="Optional primary entity"
                />
              </label>
            `}

        ${candidates.length > 0
          ? html`
              <div class="section">
                <div class="sectionHeading">
                  <span>Detected status sensors</span>
                  <small>Click to ${this.mode === "single" ? "use" : "add"}</small>
                </div>
                <div class="chips">
                  ${this.mode === "single"
                    ? candidates.slice(0, 10).map(
                        (entity) => html`
                          <button type="button" class="entityChip" @click=${() => this.selectSingleEntity(entity.entity_id)}>
                            <strong>${this.entityLabel(entity)}</strong>
                            <small>${entity.entity_id}</small>
                          </button>
                        `
                      )
                    : suggestedEntities.map(
                        (entity) => html`
                          <button type="button" class="entityChip" @click=${() => this.addEntity(entity.entity_id)}>
                            <strong>${this.entityLabel(entity)}</strong>
                            <small>${entity.entity_id}</small>
                          </button>
                        `
                      )}
                </div>
              </div>
            `
          : nothing}

        <p class="hint">
          ${this.mode === "single"
            ? "Use one per-subject status sensor. The card derives location, direction, and confidence from whichever supported attributes are available."
            : "Use one per-subject status sensor per line. The dashboard and list stay frontend-only and tolerate partial entity attributes."}
        </p>

        <datalist id="location-intelligence-entities">
          ${candidates.map((entity) => html`<option value=${entity.entity_id}>${this.entityLabel(entity)}</option>`)}
        </datalist>
      </div>
    `;
  }

  private getEntityCandidates(): HassEntity[] {
    const states = Object.values(this.hass?.states ?? {});

    return states
      .filter((entity) => this.isCandidateEntity(entity))
      .sort((left, right) => this.entityLabel(left).localeCompare(this.entityLabel(right)));
  }

  private isCandidateEntity(entity: HassEntity): boolean {
    const hasSubjectSignal =
      typeof entity.attributes.subject_id === "string" ||
      typeof entity.attributes.reference_place_name === "string" ||
      typeof entity.attributes.likely_location === "string" ||
      typeof entity.attributes.confidence === "number";
    const looksLikeStatusSensor =
      entity.entity_id.startsWith("sensor.") &&
      (entity.entity_id.endsWith("_status") || hasSubjectSignal);

    return looksLikeStatusSensor;
  }

  private entityLabel(entity: HassEntity): string {
    const friendlyName = entity.attributes.friendly_name;
    return typeof friendlyName === "string" && friendlyName.trim() !== ""
      ? friendlyName
      : entity.entity_id;
  }

  private onTextInput(
    field: "title" | "name" | "entity" | "focus_entity"
  ): (event: Event) => void {
    return (event: Event) => {
      const value = (event.target as HTMLInputElement).value.trim();
      this.updateConfig({
        [field]: value === "" ? undefined : value
      });
    };
  }

  private onEntitiesInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.updateEntityList(value);
  }

  private updateEntityList(value: string): void {
    const entities = value
      .split("\n")
      .map((entityId) => entityId.trim())
      .filter((entityId, index, all) => entityId !== "" && all.indexOf(entityId) === index);

    this.updateConfig({
      entities: entities.length > 0 ? entities : undefined,
      focus_entity:
        this.config.focus_entity && entities.includes(this.config.focus_entity)
          ? this.config.focus_entity
          : this.config.focus_entity && entities.length === 0
            ? undefined
            : this.config.focus_entity
    });
  }

  private selectSingleEntity(entityId: string): void {
    this.updateConfig({ entity: entityId });
  }

  private addEntity(entityId: string): void {
    const entities = [...(this.config.entities ?? [])];
    if (!entities.includes(entityId)) {
      entities.push(entityId);
    }

    this.updateConfig({
      entities,
      focus_entity: this.config.focus_entity ?? entityId
    });
  }

  private removeEntity(entityId: string): void {
    const entities = (this.config.entities ?? []).filter((value) => value !== entityId);
    this.updateConfig({
      entities: entities.length > 0 ? entities : undefined,
      focus_entity: this.config.focus_entity === entityId ? entities[0] : this.config.focus_entity
    });
  }

  private updateConfig(partial: Partial<LocationIntelligenceCardConfig>): void {
    this.config = {
      ...this.config,
      ...partial
    };

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true
      })
    );
  }

  static styles = [
    cardStyles,
    css`
      :host {
      display: block;
      }

      .editor {
        display: grid;
        gap: 1rem;
        padding: 0.25rem 0;
      }

    .section {
      display: grid;
      gap: 0.55rem;
    }

    .sectionHeading {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: baseline;
    }

    label {
      display: grid;
      gap: 0.35rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 600;
    }

      small {
        color: var(--li-muted);
        font-size: 0.78rem;
      }

      input,
      textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 0.75rem 0.9rem;
        border: 1px solid var(--li-border);
        border-radius: 10px;
        font: inherit;
        color: inherit;
        background: var(--li-editor-input-bg);
      }

    textarea {
      min-height: 7rem;
      resize: vertical;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

      .entityChip {
        display: grid;
        gap: 0.1rem;
        text-align: left;
        padding: 0.65rem 0.8rem;
        border-radius: 999px;
        border: 1px solid var(--li-border);
        background: var(--li-editor-chip-bg);
        color: inherit;
        cursor: pointer;
        font: inherit;
      }

    .entityChip strong {
      font-size: 0.84rem;
      font-weight: 700;
    }

    .entityChip small {
      line-height: 1.2;
    }

      .entityChip.active {
        background: var(--li-editor-chip-active);
        border-color: color-mix(in srgb, var(--li-accent-soft) 32%, transparent);
      }

      .hint {
        margin: 0;
        color: var(--li-muted);
        font-size: 0.85rem;
      }
    `
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "location-intelligence-card-editor": LocationIntelligenceCardEditorElement;
  }
}

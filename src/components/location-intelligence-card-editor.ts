import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../types/home-assistant";
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
    return html`
      <div class="editor">
        <label>
          <span>Title</span>
          <input
            .value=${this.config.title ?? ""}
            @input=${this.onTextInput("title")}
            placeholder="Optional title"
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
                  .value=${this.config.entity ?? ""}
                  @input=${this.onTextInput("entity")}
                  placeholder="sensor.alice_location_intelligence"
                />
              </label>
            `
          : html`
              <label>
                <span>Entities</span>
                <textarea
                  @input=${this.onEntitiesInput}
                  placeholder="sensor.alice_location_intelligence&#10;sensor.car_location_intelligence"
                >
${(this.config.entities ?? []).join("\n")}</textarea
                >
              </label>

              <label>
                <span>Focus entity</span>
                <input
                  .value=${this.config.focus_entity ?? ""}
                  @input=${this.onTextInput("focus_entity")}
                  placeholder="Optional primary entity"
                />
              </label>
            `}

        <p class="hint">
          ${this.mode === "single"
            ? "Use a single location intelligence entity."
            : "Enter one entity id per line."}
        </p>
      </div>
    `;
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
    const entities = value
      .split("\n")
      .map((entityId) => entityId.trim())
      .filter((entityId) => entityId !== "");

    this.updateConfig({
      entities: entities.length > 0 ? entities : undefined
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

  static styles = css`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 1rem;
      padding: 0.25rem 0;
    }

    label {
      display: grid;
      gap: 0.35rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 600;
    }

    input,
    textarea {
      box-sizing: border-box;
      width: 100%;
      padding: 0.75rem 0.9rem;
      border: 1px solid rgba(127, 127, 127, 0.35);
      border-radius: 10px;
      font: inherit;
      color: inherit;
      background: rgba(255, 255, 255, 0.85);
    }

    textarea {
      min-height: 7rem;
      resize: vertical;
    }

    .hint {
      margin: 0;
      color: #5f6b6a;
      font-size: 0.85rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "location-intelligence-card-editor": LocationIntelligenceCardEditorElement;
  }
}

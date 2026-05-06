export interface HomeAssistant {
  states: Record<string, HassEntity>;
  formatEntityState?(stateObj: HassEntity): string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface LovelaceCardConfig {
  type: string;
}

export interface LovelaceCard {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number;
}


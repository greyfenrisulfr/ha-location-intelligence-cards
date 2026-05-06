import type { HassEntity } from "./home-assistant";

export interface LocationIntelligenceCardConfig {
  type: string;
  entity?: string;
  entities?: string[];
  focus_entity?: string;
  name?: string;
  title?: string;
}

export interface LocationSnapshot {
  entityId: string;
  name: string;
  subjectType: string;
  likelyLocation?: string;
  distanceM?: number;
  bearingDeg?: number;
  confidence?: number;
  sourceLabel?: string;
  state: string;
  lastReported?: string;
  raw: HassEntity;
}


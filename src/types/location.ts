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
  subjectId?: string;
  name: string;
  subjectType: string;
  likelyLocation?: string;
  distanceM?: number;
  bearingDeg?: number;
  confidence?: number;
  confidenceLabel?: string;
  sourceLabel?: string;
  sourceCount?: number;
  accuracyM?: number;
  latitude?: number;
  longitude?: number;
  referencePlaceName?: string;
  referencePlaceKind?: string;
  state: string;
  lastReported?: string;
  raw: HassEntity;
}

import type { HassEntity } from "../types/home-assistant";
import type { LocationSnapshot } from "../types/location";

const DIRECTIONS = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW"
];

const numberOrUndefined = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

export const entityToSnapshot = (entity: HassEntity): LocationSnapshot => ({
  entityId: entity.entity_id,
  name:
    String(entity.attributes.friendly_name ?? entity.entity_id)
      .replace(/^sensor\./, "")
      .replace(/_/g, " "),
  subjectType: String(entity.attributes.subject_type ?? "subject"),
  likelyLocation:
    typeof entity.attributes.likely_location === "string"
      ? entity.attributes.likely_location
      : undefined,
  distanceM: numberOrUndefined(entity.attributes.distance_m),
  bearingDeg: numberOrUndefined(entity.attributes.bearing_deg),
  confidence: numberOrUndefined(entity.attributes.confidence),
  sourceLabel:
    typeof entity.attributes.source_label === "string"
      ? entity.attributes.source_label
      : undefined,
  state: entity.state,
  lastReported:
    typeof entity.attributes.last_reported === "string"
      ? entity.attributes.last_reported
      : entity.last_updated
        ? entity.last_updated
        : undefined,
  raw: entity
});

export const bearingToDirection = (bearing?: number): string => {
  if (bearing === undefined) {
    return "Unknown";
  }

  const normalized = ((bearing % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % DIRECTIONS.length;
  return DIRECTIONS[index];
};

export const formatDistance = (distanceM?: number): string => {
  if (distanceM === undefined) {
    return "Distance unknown";
  }

  if (distanceM < 25) {
    return "Within 25 m";
  }

  if (distanceM < 1000) {
    return `${Math.round(distanceM / 10) * 10} m away`;
  }

  const km = distanceM / 1000;
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} km away`;
};

export const formatConfidence = (confidence?: number): string => {
  if (confidence === undefined) {
    return "Confidence unknown";
  }

  const pct = Math.max(0, Math.min(100, Math.round(confidence * 100)));
  if (pct >= 80) {
    return `${pct}% confident`;
  }
  if (pct >= 50) {
    return `${pct}% confidence`;
  }
  return `${pct}% low confidence`;
};

export const confidenceTone = (confidence?: number): "high" | "medium" | "low" | "unknown" => {
  if (confidence === undefined) {
    return "unknown";
  }

  if (confidence >= 0.8) {
    return "high";
  }
  if (confidence >= 0.5) {
    return "medium";
  }
  return "low";
};

export const formatLocationSummary = (snapshot: LocationSnapshot): string => {
  if (snapshot.likelyLocation && snapshot.distanceM !== undefined) {
    return `Probably at ${snapshot.likelyLocation}, ${formatDistance(snapshot.distanceM).toLowerCase()}`;
  }

  if (snapshot.likelyLocation) {
    return `Probably at ${snapshot.likelyLocation}`;
  }

  if (snapshot.distanceM !== undefined) {
    return formatDistance(snapshot.distanceM);
  }

  return "Probable location unknown";
};

export const formatUpdated = (value?: string): string => {
  if (!value) {
    return "No recent update";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};


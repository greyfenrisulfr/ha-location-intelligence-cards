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

const stringOrUndefined = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const prettifyName = (value: string): string =>
  value
    .replace(/^sensor\./, "")
    .replace(/_status$/, "")
    .replace(/_/g, " ");

const titleCase = (value: string): string =>
  value.replace(/\b\w/g, (match) => match.toUpperCase());

const sourceCountLabel = (count?: number): string | undefined => {
  if (count === undefined) {
    return undefined;
  }

  return `${count} source${count === 1 ? "" : "s"}`;
};

export const entityToSnapshot = (entity: HassEntity): LocationSnapshot => ({
  subjectId: stringOrUndefined(entity.attributes.subject_id),
  entityId: entity.entity_id,
  name: titleCase(
    prettifyName(
      String(
        entity.attributes.friendly_name ??
          stringOrUndefined(entity.attributes.subject_id) ??
          entity.entity_id
      )
    )
  ),
  subjectType: String(entity.attributes.subject_type ?? "subject"),
  likelyLocation:
    stringOrUndefined(entity.attributes.likely_location) ??
    stringOrUndefined(entity.attributes.reference_place_name),
  distanceM:
    numberOrUndefined(entity.attributes.distance_m) ??
    numberOrUndefined(entity.attributes.distance_from_reference_m) ??
    numberOrUndefined(entity.attributes.distance_from_home_m),
  bearingDeg:
    numberOrUndefined(entity.attributes.bearing_deg) ??
    numberOrUndefined(entity.attributes.bearing_from_reference_deg) ??
    numberOrUndefined(entity.attributes.bearing_from_home_deg),
  confidence: numberOrUndefined(entity.attributes.confidence),
  confidenceLabel: stringOrUndefined(entity.attributes.confidence_label),
  sourceLabel:
    stringOrUndefined(entity.attributes.source_label) ??
    sourceCountLabel(numberOrUndefined(entity.attributes.source_count)),
  sourceCount: numberOrUndefined(entity.attributes.source_count),
  accuracyM: numberOrUndefined(entity.attributes.accuracy_m),
  latitude: numberOrUndefined(entity.attributes.latitude),
  longitude: numberOrUndefined(entity.attributes.longitude),
  referencePlaceName: stringOrUndefined(entity.attributes.reference_place_name),
  referencePlaceKind: stringOrUndefined(entity.attributes.reference_place_kind),
  state: entity.state,
  lastReported:
    stringOrUndefined(entity.attributes.last_reported) ??
    stringOrUndefined(entity.attributes.observed_at) ??
    (typeof entity.attributes.last_reported === "string"
      ? entity.attributes.last_reported
      : entity.last_updated
        ? entity.last_updated
        : undefined),
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
    return `Probably near ${snapshot.likelyLocation}, ${formatDistance(snapshot.distanceM).toLowerCase()}`;
  }

  if (snapshot.likelyLocation) {
    return `Probably near ${snapshot.likelyLocation}`;
  }

  if (snapshot.distanceM !== undefined) {
    return formatDistance(snapshot.distanceM);
  }

  return "Probable location unknown";
};

export const formatAccuracy = (accuracyM?: number): string => {
  if (accuracyM === undefined) {
    return "Accuracy unknown";
  }

  if (accuracyM < 25) {
    return `~${Math.round(accuracyM)} m accuracy`;
  }

  if (accuracyM < 1000) {
    return `~${Math.round(accuracyM / 5) * 5} m accuracy`;
  }

  return `~${(accuracyM / 1000).toFixed(1)} km accuracy`;
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

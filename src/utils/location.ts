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

const UNAVAILABLE_STATES = new Set(["unknown", "unavailable", "none"]);

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

const firstNumber = (attributes: Record<string, unknown>, keys: string[]): number | undefined => {
  for (const key of keys) {
    const value = numberOrUndefined(attributes[key]);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
};

const firstString = (attributes: Record<string, unknown>, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = stringOrUndefined(attributes[key]);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
};

const prettifyName = (value: string): string =>
  value
    .replace(/^sensor\./, "")
    .replace(/_status$/, "")
    .replace(/_/g, " ");

const titleCase = (value: string): string =>
  value.replace(/\b\w/g, (match) => match.toUpperCase());

const normalizeConfidence = (value?: number): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (value > 1 && value <= 100) {
    return value / 100;
  }

  if (value < 0 || value > 1) {
    return undefined;
  }

  return value;
};

const prettifyLabel = (value: string): string =>
  titleCase(value.replace(/[_-]/g, " "));

const normalizeStateLabel = (state: string): string => {
  if (state.trim() === "") {
    return "Unknown";
  }

  return prettifyLabel(state);
};

const normalizeSubjectType = (entity: HassEntity): string => {
  const explicit =
    firstString(entity.attributes, ["subject_type", "reference_place_kind"]) ??
    entity.entity_id.split(".")[0];

  return explicit.toLowerCase();
};

const subjectTypeLabel = (subjectType: string): string => {
  if (subjectType === "device_tracker") {
    return "Device tracker";
  }

  return prettifyLabel(subjectType);
};

const sourceCountLabel = (count?: number): string | undefined => {
  if (count === undefined) {
    return undefined;
  }

  return `${count} source${count === 1 ? "" : "s"}`;
};

export const entityToSnapshot = (entity: HassEntity): LocationSnapshot => {
  const subjectType = normalizeSubjectType(entity);
  const state = String(entity.state ?? "");
  const directionLabel =
    firstString(entity.attributes, ["direction", "direction_from_reference", "direction_from_home"]) ??
    undefined;
  const confidence = normalizeConfidence(numberOrUndefined(entity.attributes.confidence));

  return {
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
    subjectType,
    subjectTypeLabel: subjectTypeLabel(subjectType),
    likelyLocation:
      firstString(entity.attributes, [
        "likely_location",
        "reference_place_name",
        "geocoded_place_name",
        "place_name"
      ]) ?? (!UNAVAILABLE_STATES.has(state.toLowerCase()) ? state : undefined),
    distanceM: firstNumber(entity.attributes, [
      "distance_m",
      "distance_from_reference_m",
      "distance_from_home_m"
    ]),
    bearingDeg: firstNumber(entity.attributes, [
      "bearing_deg",
      "bearing_from_reference_deg",
      "bearing_from_home_deg"
    ]),
    directionLabel,
    confidence,
    confidenceLabel: firstString(entity.attributes, ["confidence_label"]),
    sourceLabel:
      firstString(entity.attributes, ["source_label", "source_name"]) ??
      sourceCountLabel(numberOrUndefined(entity.attributes.source_count)),
    sourceCount: numberOrUndefined(entity.attributes.source_count),
    accuracyM: firstNumber(entity.attributes, ["accuracy_m", "gps_accuracy", "horizontal_accuracy"]),
    latitude: numberOrUndefined(entity.attributes.latitude),
    longitude: numberOrUndefined(entity.attributes.longitude),
    referencePlaceName: firstString(entity.attributes, ["reference_place_name", "place_name"]),
    referencePlaceKind: firstString(entity.attributes, ["reference_place_kind"]),
    state,
    stateLabel: normalizeStateLabel(state),
    isAvailable: !UNAVAILABLE_STATES.has(state.toLowerCase()),
    lastReported:
      firstString(entity.attributes, ["last_reported", "observed_at", "timestamp"]) ??
      entity.last_updated ??
      entity.last_changed,
    raw: entity
  };
};

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

export const formatDirection = (snapshot: LocationSnapshot): string => {
  if (snapshot.directionLabel) {
    return prettifyLabel(snapshot.directionLabel);
  }

  return bearingToDirection(snapshot.bearingDeg);
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

export const sortSnapshots = (snapshots: LocationSnapshot[]): LocationSnapshot[] =>
  [...snapshots].sort((left, right) => {
    if (left.isAvailable !== right.isAvailable) {
      return Number(right.isAvailable) - Number(left.isAvailable);
    }

    if (left.distanceM !== undefined && right.distanceM !== undefined && left.distanceM !== right.distanceM) {
      return left.distanceM - right.distanceM;
    }

    if (left.confidence !== undefined && right.confidence !== undefined && left.confidence !== right.confidence) {
      return right.confidence - left.confidence;
    }

    return left.name.localeCompare(right.name);
  });

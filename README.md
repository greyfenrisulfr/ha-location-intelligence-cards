# Home Assistant Location Intelligence Cards

Frontend-only Lovelace scaffolding for conservative, explainable spatial awareness cards that pair with the backend integration at `greyfenrisulfr/location_intelligence`.

## Included cards

- `location-intelligence-compass-card`
- `location-intelligence-subject-list-card`
- `location-intelligence-dashboard-card`

## Roadmap

### Phase 1: baseline card package

- Ship the three Lovelace cards with stable entity parsing and conservative formatting.
- Support Home Assistant card discovery, previews, stub configs, and a basic visual editor.
- Keep the frontend independent from the backend integration so entity attributes can evolve safely.

### Phase 2: richer situational awareness

- Add status states such as moving, stationary, stale, and offline.
- Show relative freshness and stale-data warnings instead of only raw timestamps.
- Introduce optional grouping by people, pets, vehicles, and assets.

### Phase 3: map and relationship views

- Replace the dashboard placeholder with a real fused-position map surface.
- Add leader/follower, nearest-subject, and zone-proximity summaries.
- Support short movement trails when the backend starts exposing history-friendly attributes.

### Phase 4: polish and release readiness

- Add screenshots and example dashboards.
- Expand compatibility testing across phone and tablet layouts.
- Publish release notes and HACS-oriented installation guidance.

## Design goals

- Show probable location, direction, distance, and confidence.
- Avoid fake precision in labels and formatting.
- Work for people, pets, vehicles, phones, assets, and temporary places.
- Fit mobile and desktop Home Assistant dashboards.

## Expected entity shape

These cards currently expect Home Assistant entities whose attributes expose some or all of:

- `friendly_name`
- `distance_m`
- `bearing_deg`
- `confidence`
- `likely_location`
- `source_label`
- `subject_type`
- `last_reported`

The backend integration can later normalize these attributes from fused sources.

That backend lives in the separate repository:

- `https://github.com/greyfenrisulfr/location_intelligence`

## Example Lovelace config

```yaml
type: custom:location-intelligence-compass-card
entity: sensor.alice_location_intelligence
name: Alice
```

```yaml
type: custom:location-intelligence-subject-list-card
title: Nearby Subjects
entities:
  - sensor.alice_location_intelligence
  - sensor.car_location_intelligence
  - sensor.dog_location_intelligence
```

```yaml
type: custom:location-intelligence-dashboard-card
title: Spatial Awareness
focus_entity: sensor.alice_location_intelligence
entities:
  - sensor.alice_location_intelligence
  - sensor.car_location_intelligence
  - sensor.bag_location_intelligence
```

## Development

```bash
npm install
npm run check
npm run build
```

Load `dist/ha-location-intelligence-cards.js` as a Lovelace resource.

The current baseline also exposes Home Assistant custom-card metadata and a basic config editor for manual setup in the UI.

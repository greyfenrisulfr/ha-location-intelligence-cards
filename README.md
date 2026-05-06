# Home Assistant Location Intelligence

Frontend-first scaffolding for a Home Assistant location intelligence layer focused on conservative, explainable spatial awareness.

## Included cards

- `location-intelligence-compass-card`
- `location-intelligence-subject-list-card`
- `location-intelligence-dashboard-card`

## Repository structure

- `src/`: Lovelace custom card sources and shared UI utilities
- `dist/`: compiled browser bundle output
- `custom_components/location_intelligence/`: starter integration namespace for backend work

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

Load `dist/location-intelligence.js` as a Lovelace resource.

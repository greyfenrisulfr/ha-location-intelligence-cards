# Home Assistant Location Intelligence Cards

Frontend-only Lovelace scaffolding for conservative, explainable spatial awareness cards that pair with the backend integration at `greyfenrisulfr/location_intelligence`.

## Included cards

- `location-intelligence-compass-card`
- `location-intelligence-subject-list-card`
- `location-intelligence-dashboard-card`

## Current baseline

- Stable frontend parsing for both placeholder attributes and the current backend subject sensor fields.
- Conservative distance, direction, confidence, accuracy, and timestamp formatting with graceful fallbacks for partial entities.
- Home Assistant custom-card discovery metadata, preview support, stub configs, and a basic built-in visual editor.
- A dashboard overview with focus detail, multi-subject roster, and a frontend-only relative bearing and distance plot.

## Roadmap

### Phase 1: baseline card package completed

- Ship the three Lovelace cards with stable entity parsing and conservative formatting.
- Support Home Assistant card discovery, previews, stub configs, and a basic visual editor.
- Keep the frontend independent from the backend integration so entity attributes can evolve safely.

### Phase 2: richer situational awareness

- Add status states such as moving, stationary, stale, and offline.
- Show relative freshness and stale-data warnings instead of only raw timestamps.
- Introduce optional grouping by people, pets, vehicles, and assets.

### Phase 3: map and relationship views

- Add a real fused-position map surface alongside the current relative overview plot.
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

## Backend compatibility

The cards now support both:

- the original placeholder frontend attributes
- the current backend output from `greyfenrisulfr/location_intelligence`

For the backend integration, use the per-subject `status` sensors as card entities. Those sensors already expose the main data the cards need, including:

- `subject_id`
- `latitude`
- `longitude`
- `confidence`
- `confidence_label`
- `source_count`
- `accuracy_m`
- `observed_at`
- `reference_place_name`
- `reference_place_kind`
- `distance_from_reference_m`
- `bearing_from_reference_deg`
- `direction_from_reference`
- `distance_from_home_m`
- `bearing_from_home_deg`
- `direction_from_home`

The backend does not currently expose the original placeholder aliases `likely_location`, `source_label`, or `last_reported` on those subject sensors, so the frontend now derives equivalent display values from the backend fields instead of requiring those aliases.

That backend lives in the separate repository:

- `https://github.com/greyfenrisulfr/location_intelligence`

## Example Lovelace config

```yaml
type: custom:location-intelligence-compass-card
entity: sensor.alice_status
name: Alice
```

```yaml
type: custom:location-intelligence-subject-list-card
title: Nearby Subjects
entities:
  - sensor.alice_status
  - sensor.car_status
  - sensor.dog_status
```

```yaml
type: custom:location-intelligence-dashboard-card
title: Spatial Awareness
focus_entity: sensor.alice_status
entities:
  - sensor.alice_status
  - sensor.car_status
  - sensor.bag_status
```

## Installation

### HACS

1. Open HACS in Home Assistant.
2. Add this repository as a custom repository:
   - Repository: `https://github.com/greyfenrisulfr/ha-location-intelligence-cards`
   - Category: `Dashboard`
3. Find **Home Assistant Location Intelligence Cards** in HACS and install it.
4. Restart Home Assistant.
5. Open any dashboard and add one of the custom cards:
   - `custom:location-intelligence-compass-card`
   - `custom:location-intelligence-subject-list-card`
   - `custom:location-intelligence-dashboard-card`

HACS should register the frontend resource automatically. If the card does not appear after installation, add this resource manually in **Settings -> Dashboards -> Resources**:

- URL: `/hacsfiles/ha-location-intelligence-cards/ha-location-intelligence-cards.js`
- Type: `module`

If you still see `Custom element doesn't exist`, remove any stale resource entry for this card, add the path above, then reload the browser.

### Manual

Build the project and load the generated bundle as a Lovelace resource.

## Development

```bash
npm install
npm run check
npm run build
```

Then add `dist/ha-location-intelligence-cards.js` as a Lovelace resource.

The current baseline also exposes Home Assistant custom-card metadata and a basic config editor for manual setup in the UI.

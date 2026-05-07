# Changelog

## 0.4.0 - 2026-05-07

- Redesigned the cards toward a darker, app-like location intelligence UI with denser panels, stronger hierarchy, and map-style visual treatment.
- Rebuilt the dashboard into a more productized operations layout with a live relative-view stage, detail rail, and tracked-subject table.
- Restyled the compass and subject list cards to align with the new visual language and upgraded the direction ring to feel closer to the reference radar aesthetic.

## 0.3.2 - 2026-05-06

- Added dark mode support across the cards, shared tokens, and built-in editor using Home Assistant theme-aware surfaces and text colors.
- Replaced remaining hardcoded light backgrounds in the compass, list, dashboard, confidence chip, and direction ring so the UI stays readable in dark themes.

## 0.3.1 - 2026-05-06

- Corrected the HACS/manual resource path documentation back to `/hacsfiles/ha-location-intelligence-cards/ha-location-intelligence-cards.js`.
- Restored the HACS plugin filename metadata to `ha-location-intelligence-cards.js` so HACS can resolve the built card bundle correctly.
- Published a clean follow-up release because the `v0.3.0` tag on GitHub pointed to the older `0.2.3` commit instead of the intended Phase 1 release commit.

## 0.3.0 - 2026-05-06

- Completed the Phase 1 baseline package and marked it as such in the README.
- Replaced the dashboard placeholder with a real frontend-only overview including focus detail, relative plot, and subject roster.
- Hardened shared entity parsing and conservative formatting so the cards tolerate partial or evolving backend attributes more consistently.
- Upgraded the built-in card editor with detected entity suggestions, multi-entity management, and better focus-entity setup.

## 0.2.3 - 2026-05-06

- Clarified HACS installation in the README with explicit custom-repository steps.
- Added the expected `/hacsfiles/ha-location-intelligence-cards/ha-location-intelligence-cards.js` resource path as a fallback when Home Assistant does not auto-register the card.

## 0.2.2 - 2026-05-06

- Added compatibility with the current `greyfenrisulfr/location_intelligence` backend subject sensor attributes.
- Derived display fields from backend data such as `reference_place_name`, `source_count`, and `observed_at` instead of requiring placeholder aliases.
- Updated card stub configs, editor hints, and README examples to target per-subject `sensor.*_status` entities.

## 0.2.1 - 2026-05-06

- Fixed HACS packaging by tracking the built `dist` artifact in the repository.
- Renamed the built card asset to `ha-location-intelligence-cards.js` to align with the repository name.
- Updated HACS and README references to the tracked distributable filename.

## 0.2.0 - 2026-05-06

- Added a documented roadmap for the card package.
- Added Home Assistant custom card registration metadata for discovery and previews.
- Added stub Lovelace configs for all three cards.
- Added a reusable basic card editor for single-entity and multi-entity setup.
- Added an empty-state message for the subject list card when entities are unavailable.

## 0.1.0 - 2026-05-06

- Initial scaffold for the compass, subject list, and dashboard cards.

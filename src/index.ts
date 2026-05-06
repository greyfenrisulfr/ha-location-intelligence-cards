import "./cards/location-intelligence-compass-card";
import "./cards/location-intelligence-dashboard-card";
import "./cards/location-intelligence-subject-list-card";

window.customCards = window.customCards ?? [];
window.customCards.push(
  {
    type: "location-intelligence-compass-card",
    name: "Location Intelligence Compass",
    description: "Single-subject compass and confidence card for one fused location entity.",
    preview: true
  },
  {
    type: "location-intelligence-subject-list-card",
    name: "Location Intelligence Subject List",
    description: "Compact overview of multiple location intelligence entities.",
    preview: true
  },
  {
    type: "location-intelligence-dashboard-card",
    name: "Location Intelligence Dashboard",
    description: "Focus view plus multi-subject overview for spatial awareness dashboards.",
    preview: true
  }
);

console.info(
  "%cLOCATION-INTELLIGENCE%c cards loaded",
  "color: white; background: #284c3f; font-weight: 700; padding: 2px 6px; border-radius: 999px;",
  "color: #284c3f; font-weight: 600;"
);

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

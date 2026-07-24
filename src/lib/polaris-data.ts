export type Criticality = "Critical" | "High" | "Medium" | "Low";

export type CapabilityStatus =
  | "Operational"
  | "Beta"
  | "Ingestion only"
  | "Configured but unavailable"
  | "Unsupported";

export type RiskLevel = "Monitor" | "Elevated" | "High" | "Severe";

export interface Asset {
  id: string;
  name: string;
  lat: number;
  lon: number;
  criticality: Criticality;
  region: string;
  demo: true;
}

export const ASSETS: Asset[] = [
  {
    id: "mum-hq",
    name: "Mumbai Corporate Office",
    lat: 19.076,
    lon: 72.8777,
    criticality: "High",
    region: "Maharashtra, IN",
    demo: true,
  },
  {
    id: "del-dc",
    name: "Delhi Data Centre",
    lat: 28.6139,
    lon: 77.209,
    criticality: "Critical",
    region: "Delhi NCR, IN",
    demo: true,
  },
  {
    id: "che-wh",
    name: "Chennai Coastal Warehouse",
    lat: 13.0827,
    lon: 80.2707,
    criticality: "High",
    region: "Tamil Nadu, IN",
    demo: true,
  },
];

export interface Capability {
  id: string;
  name: string;
  status: CapabilityStatus;
  source: string;
  evaluates: string;
  arrival: "Yes" | "Partial" | "Not modelled" | "Source-provided";
  method: "Trained ML" | "Deterministic rules" | "Rule + heuristics" | "Ingestion" | "Manual review";
  limitation: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "eq",
    name: "Earthquake",
    status: "Operational",
    source: "USGS live feed",
    evaluates: "Magnitude, depth, epicentre, distance to assets, damage & consequence probability",
    arrival: "Not modelled",
    method: "Trained ML",
    limitation: "Shadow-mode inference; human review required before any external action.",
  },
  {
    id: "wind",
    name: "Damaging Wind",
    status: "Operational",
    source: "Open-Meteo forecast",
    evaluates: "Dangerous gust detection, forecast window, per-asset exposure",
    arrival: "Yes",
    method: "Deterministic rules",
    limitation: "Rule-based thresholds; not a trained ML model.",
  },
  {
    id: "rain",
    name: "Heavy Rain",
    status: "Operational",
    source: "Open-Meteo forecast",
    evaluates: "Intense-rain detection, forecast windows, business-impact tags",
    arrival: "Yes",
    method: "Deterministic rules",
    limitation: "Signals rain intensity — not a confirmed flood forecast.",
  },
  {
    id: "fire",
    name: "Wildfire",
    status: "Beta",
    source: "NASA FIRMS (configured)",
    evaluates: "Active-fire proximity to assets",
    arrival: "Not modelled",
    method: "Rule + heuristics",
    limitation: "Proximity only — fire spread is not predicted.",
  },
  {
    id: "cyclone",
    name: "Cyclone / Severe Storm",
    status: "Beta",
    source: "Authoritative bulletins",
    evaluates: "Track, category, expected landfall window",
    arrival: "Source-provided",
    method: "Ingestion",
    limitation: "Uses issuing-agency forecast track; no independent modelling.",
  },
  {
    id: "tsunami",
    name: "Tsunami",
    status: "Beta",
    source: "PTWC / NTWC bulletins",
    evaluates: "Advisories, watches, warnings; coastal-asset exposure",
    arrival: "Source-provided",
    method: "Ingestion",
    limitation: "Arrival estimates only from authoritative bulletins.",
  },
  {
    id: "flood",
    name: "Flood Potential",
    status: "Beta",
    source: "Rainfall + terrain heuristics",
    evaluates: "Elevated flood potential windows",
    arrival: "Partial",
    method: "Rule + heuristics",
    limitation: "Potential signal — not a confirmed flood inundation forecast.",
  },
  {
    id: "aqi",
    name: "Air Quality & Smoke",
    status: "Ingestion only",
    source: "Open-Meteo AQ",
    evaluates: "PM2.5, PM10, ozone at asset coordinates",
    arrival: "Not modelled",
    method: "Ingestion",
    limitation: "Displayed as raw values; no impact classification yet.",
  },
  {
    id: "heat",
    name: "Heatwave & Extreme Cold",
    status: "Beta",
    source: "Open-Meteo forecast",
    evaluates: "Sustained temperature extremes vs. regional norms",
    arrival: "Yes",
    method: "Deterministic rules",
    limitation: "Regional thresholds are configured — not learned.",
  },
  {
    id: "snow",
    name: "Snow & Blizzard",
    status: "Beta",
    source: "Open-Meteo forecast",
    evaluates: "Accumulation, wind-chill, visibility windows",
    arrival: "Yes",
    method: "Deterministic rules",
    limitation: "Coverage limited to Open-Meteo forecast domain.",
  },
  {
    id: "lightning",
    name: "Lightning / Thunderstorm",
    status: "Ingestion only",
    source: "Forecast CAPE / lightning risk",
    evaluates: "Elevated thunderstorm risk windows",
    arrival: "Partial",
    method: "Ingestion",
    limitation: "Risk indicator only — not observed-strike data.",
  },
  {
    id: "volcano",
    name: "Volcano & Ash",
    status: "Configured but unavailable",
    source: "VAAC / Smithsonian GVP",
    evaluates: "Eruption bulletins, ash advisories",
    arrival: "Source-provided",
    method: "Ingestion",
    limitation: "Feed access pending; no live ingestion at this time.",
  },
  {
    id: "landslide",
    name: "Landslide Susceptibility",
    status: "Beta",
    source: "NASA LHASA-derived layers",
    evaluates: "Static susceptibility × recent rainfall",
    arrival: "Not modelled",
    method: "Rule + heuristics",
    limitation: "Susceptibility — not an exact prediction.",
  },
  {
    id: "disease",
    name: "Disease Outbreaks",
    status: "Manual review" as unknown as CapabilityStatus,
    source: "WHO / gov bulletins",
    evaluates: "Regional outbreak notices",
    arrival: "Not modelled",
    method: "Manual review",
    limitation: "Analyst-curated; no automated ingestion yet.",
  },
  {
    id: "unrest",
    name: "Civil Unrest & Security",
    status: "Configured but unavailable",
    source: "Partner feeds (pending)",
    evaluates: "Localized security incidents",
    arrival: "Not modelled",
    method: "Ingestion",
    limitation: "Provider integration not yet available.",
  },
  {
    id: "infra",
    name: "Infrastructure Disruption",
    status: "Ingestion only",
    source: "Utility & transit notices",
    evaluates: "Power, transit, telecom disruption bulletins",
    arrival: "Source-provided",
    method: "Ingestion",
    limitation: "Displayed as raw notices; no correlation modelling.",
  },
];

export interface Incident {
  id: string;
  hazard: string;
  headline: string;
  risk: RiskLevel;
  confidence: number;
  distanceKm: number;
  assetId: string;
  arrival: string;
  detectedAt: string;
  source: string;
  method: Capability["method"];
  impacts: string[];
  actions: string[];
  demo?: boolean;
}

export const INCIDENTS: Incident[] = [
  {
    id: "INC-2411",
    hazard: "Earthquake",
    headline: "M 5.2 offshore event, 84 km SW of Chennai Coastal Warehouse",
    risk: "Elevated",
    confidence: 0.78,
    distanceKm: 84,
    assetId: "che-wh",
    arrival: "Not applicable — ground shaking already propagated",
    detectedAt: "2 min ago · USGS",
    source: "USGS",
    method: "Trained ML",
    impacts: [
      "Possible non-structural damage at coastal facility",
      "Short-duration power fluctuations plausible",
      "No tsunami advisory issued at this time",
    ],
    actions: [
      "Verify staff safety and facility integrity",
      "Confirm UPS + generator status at warehouse",
      "Monitor PTWC bulletin refresh window",
    ],
  },
  {
    id: "INC-2410",
    hazard: "Heavy Rain",
    headline: "Intense rainfall forecast band over Mumbai Corporate Office",
    risk: "High",
    confidence: 0.66,
    distanceKm: 0,
    assetId: "mum-hq",
    arrival: "Onset in 3–5 hrs · window ~7 hrs",
    detectedAt: "6 min ago · Open-Meteo",
    source: "Open-Meteo",
    method: "Deterministic rules",
    impacts: [
      "Commute disruption for on-site staff",
      "Localized waterlogging risk at ground level",
      "Possible last-mile logistics delay",
    ],
    actions: [
      "Advise flexible arrival windows",
      "Confirm drainage & basement pumps",
      "Delay non-critical inbound shipments",
    ],
  },
  {
    id: "INC-2409",
    hazard: "Damaging Wind",
    headline: "Gust window 78–92 km/h over Delhi Data Centre corridor",
    risk: "Elevated",
    confidence: 0.71,
    distanceKm: 0,
    assetId: "del-dc",
    arrival: "Onset in 11 hrs · window ~4 hrs",
    detectedAt: "12 min ago · Open-Meteo",
    source: "Open-Meteo",
    method: "Deterministic rules",
    impacts: [
      "Debris risk to rooftop HVAC and antennas",
      "Possible short grid instability",
      "Elevated risk to outdoor contractors",
    ],
    actions: [
      "Secure rooftop assets before onset window",
      "Pre-stage generator fuel top-up",
      "Pause external maintenance during window",
    ],
  },
];

export const RISK_TOKEN: Record<RiskLevel, { fg: string; ring: string; label: string }> = {
  Monitor:  { fg: "#7ec6ff", ring: "rgba(126,198,255,0.35)", label: "MONITOR" },
  Elevated: { fg: "#f2c94c", ring: "rgba(242,201,76,0.35)",  label: "ELEVATED" },
  High:     { fg: "#f28c4c", ring: "rgba(242,140,76,0.4)",   label: "HIGH" },
  Severe:   { fg: "#ef4444", ring: "rgba(239,68,68,0.45)",   label: "SEVERE" },
};

export const STATUS_TOKEN: Record<string, { fg: string; bg: string }> = {
  Operational:                    { fg: "#19c37d", bg: "rgba(25,195,125,0.12)" },
  Beta:                           { fg: "#a89dff", bg: "rgba(168,157,255,0.12)" },
  "Ingestion only":               { fg: "#7ec6ff", bg: "rgba(126,198,255,0.12)" },
  "Configured but unavailable":   { fg: "#8a8a8a", bg: "rgba(138,138,138,0.12)" },
  Unsupported:                    { fg: "#666",    bg: "rgba(102,102,102,0.10)" },
  "Manual review":                { fg: "#f2c94c", bg: "rgba(242,201,76,0.12)" },
};

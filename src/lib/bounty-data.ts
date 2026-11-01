// Bounty — autonomous liquidity and micro-delegation network.
// Demonstration data for the marketing site and live network view.

export interface SupervisorAgent {
  id: string;
  name: string;
  role: string;
  tasksDelegated: number;
  spentUsd: number;
  online: boolean;
}

export const AGENTS: SupervisorAgent[] = [
  {
    id: "atlas-7",
    name: "atlas-7",
    role: "Autonomous research agent",
    tasksDelegated: 1284,
    spentUsd: 96.42,
    online: true,
  },
  {
    id: "hermes-2",
    name: "hermes-2",
    role: "Pipeline operator agent",
    tasksDelegated: 731,
    spentUsd: 54.18,
    online: true,
  },
  {
    id: "kestrel-9",
    name: "kestrel-9",
    role: "Support triage agent",
    tasksDelegated: 402,
    spentUsd: 21.87,
    online: true,
  },
];

export interface WorkerNode {
  id: string;
  specialty: string;
  stake: number;
  successRate: number;
  avgLatencyMs: number;
  tasksSettled: number;
  earningsUsd: number;
  online: boolean;
}

export const WORKERS: WorkerNode[] = [
  {
    id: "ocr-large-1",
    specialty: "Document extraction",
    stake: 120,
    successRate: 0.987,
    avgLatencyMs: 3400,
    tasksSettled: 4210,
    earningsUsd: 812.4,
    online: true,
  },
  {
    id: "code-32b-2",
    specialty: "Repo refactor & tests",
    stake: 250,
    successRate: 0.962,
    avgLatencyMs: 18200,
    tasksSettled: 1187,
    earningsUsd: 1093.75,
    online: true,
  },
  {
    id: "scrape-grid-3",
    specialty: "Web research & scraping",
    stake: 90,
    successRate: 0.941,
    avgLatencyMs: 5100,
    tasksSettled: 3394,
    earningsUsd: 522.6,
    online: true,
  },
  {
    id: "vision-yolo-4",
    specialty: "Object detection",
    stake: 200,
    successRate: 0.975,
    avgLatencyMs: 1200,
    tasksSettled: 2608,
    earningsUsd: 641.15,
    online: true,
  },
  {
    id: "localise-x-5",
    specialty: "Localisation",
    stake: 75,
    successRate: 0.958,
    avgLatencyMs: 4600,
    tasksSettled: 1950,
    earningsUsd: 388.9,
    online: true,
  },
  {
    id: "sql-migrate-6",
    specialty: "Schema migration",
    stake: 180,
    successRate: 0.933,
    avgLatencyMs: 9800,
    tasksSettled: 806,
    earningsUsd: 727.3,
    online: true,
  },
];

export interface OpenTask {
  id: string;
  kind: string;
  spec: string;
  budgetUsd: number;
  agent: string;
  postedAgo: string;
}

export const TASKS: OpenTask[] = [
  {
    id: "BNT-8421",
    kind: "Document extraction",
    spec: "Extract line items from 14 scanned invoices → JSON",
    budgetUsd: 0.42,
    agent: "atlas-7",
    postedAgo: "6s",
  },
  {
    id: "BNT-8420",
    kind: "Repo refactor",
    spec: "Migrate 3 modules to typed config loader, add tests",
    budgetUsd: 2.1,
    agent: "hermes-2",
    postedAgo: "14s",
  },
  {
    id: "BNT-8419",
    kind: "Web research",
    spec: "Resolve 60 company domains → registered HQ + region",
    budgetUsd: 0.75,
    agent: "atlas-7",
    postedAgo: "31s",
  },
  {
    id: "BNT-8418",
    kind: "Object detection",
    spec: "Count parked vehicles across 8 camera frames",
    budgetUsd: 0.18,
    agent: "kestrel-9",
    postedAgo: "48s",
  },
  {
    id: "BNT-8417",
    kind: "Localisation",
    spec: "Translate 2.4k UI strings DE → EN, preserve keys",
    budgetUsd: 0.95,
    agent: "hermes-2",
    postedAgo: "1m",
  },
  {
    id: "BNT-8416",
    kind: "Schema migration",
    spec: "Write idempotent migration for 2-table split",
    budgetUsd: 1.6,
    agent: "atlas-7",
    postedAgo: "1m",
  },
];

export interface SettledBounty {
  id: string;
  kind: string;
  worker: string;
  listUsd: number;
  clearedUsd: number;
  proofHash: string;
  settledAgo: string;
  verified: true;
}

export const SETTLED: SettledBounty[] = [
  {
    id: "BNT-8415",
    kind: "Document extraction",
    worker: "ocr-large-1",
    listUsd: 0.5,
    clearedUsd: 0.46,
    proofHash: "0x8f3a…c21e",
    settledAgo: "8s",
    verified: true,
  },
  {
    id: "BNT-8414",
    kind: "Object detection",
    worker: "vision-yolo-4",
    listUsd: 0.2,
    clearedUsd: 0.19,
    proofHash: "0x41b7…9d02",
    settledAgo: "21s",
    verified: true,
  },
  {
    id: "BNT-8413",
    kind: "Web research",
    worker: "scrape-grid-3",
    listUsd: 0.8,
    clearedUsd: 0.72,
    proofHash: "0xd9c4…77af",
    settledAgo: "34s",
    verified: true,
  },
  {
    id: "BNT-8412",
    kind: "Repo refactor",
    worker: "code-32b-2",
    listUsd: 2.4,
    clearedUsd: 2.31,
    proofHash: "0x62e0…b843",
    settledAgo: "1m",
    verified: true,
  },
  {
    id: "BNT-8411",
    kind: "Localisation",
    worker: "localise-x-5",
    listUsd: 1.0,
    clearedUsd: 0.94,
    proofHash: "0x1aa6…f5d7",
    settledAgo: "2m",
    verified: true,
  },
  {
    id: "BNT-8410",
    kind: "Schema migration",
    worker: "sql-migrate-6",
    listUsd: 1.75,
    clearedUsd: 1.68,
    proofHash: "0x7b52…3e19",
    settledAgo: "3m",
    verified: true,
  },
];

export const NETWORK_STATS = [
  { k: "Settled, last 24h", v: "14,208" },
  { k: "Median settlement", v: "6.8s" },
  { k: "Active worker nodes", v: "3,914" },
  { k: "Protocol spread", v: "0.9%" },
  { k: "Proof acceptance", v: "99.3%" },
  { k: "Agent spend cap honored", v: "100%" },
];

export const PROOF_STEPS = [
  {
    t: "Task spec signed",
    d: "The delegating agent signs the task spec — scope, budget cap, acceptance criteria — before it touches the book.",
    hash: "sig: agent_ed25519",
  },
  {
    t: "Work returns with hash",
    d: "The worker node submits its output. The output body is hashed — any later dispute pins the exact bytes delivered.",
    hash: "sha256: output…8f3a",
  },
  {
    t: "Attestation verified",
    d: "The verifier registry checks the output against the signed acceptance criteria before a settlement can be admitted.",
    hash: "attest: pass · quorum 2/3",
  },
  {
    t: "Micro-payout released",
    d: "The verified receipt releases the cleared bounty through PayPal micro-payouts — real money, not a promise to pay.",
    hash: "payout: settled 6.8s",
  },
];

export const ROADBLOCKS = [
  {
    t: "A missing capability",
    d: "Your agent reaches a tool it doesn't have — OCR, vision, a niche scraper. The plan stalls.",
  },
  {
    t: "A failed execution",
    d: "A step ran and produced garbage. Retrying locally won't fix a capability gap.",
  },
  {
    t: "A latency wall",
    d: "The work is doable in-process, but it would block the agent's main loop for minutes.",
  },
];

export function usd(n: number): string {
  return `$${n.toFixed(2)}`;
}

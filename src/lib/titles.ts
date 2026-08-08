export const HACKER_TITLES = [
  "DeFi Ninja",
  "Smart Contract Wizard",
  "Protocol Pirate",
  "Zero-Knowledge Monk",
  "Feral Shipper",
  "Caffeinated Beach Architect",
  "Rollup Romantic",
  "Latency Surfer",
  "Midnight Merge Conflict",
  "Sunburnt Solidity Sage",
  "Bytecode Beachcomber",
  "Susu Stack Overlord",
  "Mempool Mystic",
  "Terminal Tan Enjoyer",
  "Feni-Fueled Debugger",
];

export function rollTitle(current?: string) {
  const pool = HACKER_TITLES.filter((t) => t !== current);
  return pool[Math.floor(Math.random() * pool.length)] ?? HACKER_TITLES[0]!;
}

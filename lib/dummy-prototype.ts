export const profiles = [
  {
    id: "p1",
    name: "You · Home",
    emoji: "🏠",
    automations: ["Coffee ~9:00", "Lunch 1–3 (smart)", "Milk + basics"],
  },
  {
    id: "p2",
    name: "Partner",
    emoji: "☕",
    automations: ["Groceries Tue/Thu", "Paneer add-ons"],
  },
  {
    id: "p3",
    name: "Team · Mumbai",
    emoji: "🍱",
    automations: ["Group lunch Wed", "ETA vs calendar"],
  },
] as const;

export const tomorrowBasket = [
  { item: "Toned milk", qty: "1 L", status: "in stock" },
  { item: "Brown eggs", qty: "6 pack", status: "low → swapped to white" },
  { item: "Paneer", qty: "200 g", status: "added for tomorrow" },
] as const;

export const teamOrderPreview = {
  restaurant: "Masala Library",
  eta: "12:38 PM",
  target: "12:45 PM · meeting ends",
  people: 4,
  match: "Within 7 min of window",
} as const;

export const lunchAdjustment = {
  window: "1:00 – 3:00 PM",
  conflict: "2:00 – 2:30 PM · blocked",
  suggestion: "Order for 12:45 PM pickup · eat before the slot",
} as const;

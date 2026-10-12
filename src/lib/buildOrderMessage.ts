import type { Listing } from "../types/listing";
import type { Order } from "../types/order";
import { formatDateTime } from "./formatDateTime";

// See figma-handoff.md §4 for the plain-text message shape this reproduces.
export function buildOrderMessage(order: Order, listing: Listing): string {
  const lines = [
    "New Order Request",
    `Item: ${listing.title}`,
  ];

  if (listing.category === "gadget") {
    lines.push(`Quantity: ${order.quantity ?? 1}`);
  }

  lines.push(
    `Name: ${order.fullName}`,
    `Phone: ${order.phone}`,
    `Delivery: ${order.addressOrViewingLocation}`,
  );

  if (listing.category === "house" && order.preferredDateTime) {
    lines.push(`Date: ${formatDateTime(order.preferredDateTime)}`);
  }

  lines.push(`Notes: ${order.notes?.trim() ? order.notes : "—"}`);

  return lines.join("\n");
}

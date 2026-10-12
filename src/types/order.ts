export type Order = {
  fullName: string;
  phone: string;
  addressOrViewingLocation: string;
  quantity?: number; // gadgets only; omit or default 1 for houses
  preferredDateTime?: string; // houses only
  notes?: string;
  listingId: string;
};

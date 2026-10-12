export type ListingCategory = "house" | "gadget";

export type Listing = {
  id: string;
  category: ListingCategory;
  title: string;
  price: number; // GHS (Ghana Cedi)
  images: string[];
  videos?: string[]; // houses only — shot/walkthrough video clips
  location?: string; // houses only
  beds?: number; // houses only
  baths?: number; // houses only
  sqft?: number; // houses only
  brand?: string; // gadgets only
  rating?: number; // gadgets only
  reviewCount?: number; // gadgets only
  inStock?: boolean; // gadgets only
  description: string;
  sellerName: string; // agent name (house) or store/vendor (gadget)
};

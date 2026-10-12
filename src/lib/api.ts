import { API_BASE_URL } from "../config";
import type { Listing, ListingCategory } from "../types/listing";
import type { Order } from "../types/order";

type ListingResponse = {
  id: string;
  category: ListingCategory;
  title: string;
  price: string;
  images: string[];
  videos: string[];
  location: string;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  brand: string;
  rating: string | null;
  review_count: number | null;
  in_stock: boolean | null;
  description: string;
  seller_name: string;
};

function toListing(data: ListingResponse): Listing {
  return {
    id: data.id,
    category: data.category,
    title: data.title,
    price: Number(data.price),
    images: data.images,
    videos: data.videos.length > 0 ? data.videos : undefined,
    location: data.location || undefined,
    beds: data.beds ?? undefined,
    baths: data.baths ?? undefined,
    sqft: data.sqft ?? undefined,
    brand: data.brand || undefined,
    rating: data.rating !== null ? Number(data.rating) : undefined,
    reviewCount: data.review_count ?? undefined,
    inStock: data.in_stock ?? undefined,
    description: data.description,
    sellerName: data.seller_name,
  };
}

export async function fetchListings(): Promise<Listing[]> {
  const response = await fetch(`${API_BASE_URL}/api/listings/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch listings (${response.status})`);
  }
  const data: ListingResponse[] = await response.json();
  return data.map(toListing);
}

export async function fetchListingById(id: string): Promise<Listing | null> {
  const response = await fetch(`${API_BASE_URL}/api/listings/${id}/`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch listing ${id} (${response.status})`);
  }
  const data: ListingResponse = await response.json();
  return toListing(data);
}

export async function submitOrder(order: Order): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      listing_id: order.listingId,
      full_name: order.fullName,
      phone: order.phone,
      address_or_viewing_location: order.addressOrViewingLocation,
      quantity: order.quantity ?? null,
      preferred_date_time: order.preferredDateTime || null,
      notes: order.notes ?? "",
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit order (${response.status})`);
  }
}

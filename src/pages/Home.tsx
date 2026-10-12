import { useEffect, useMemo, useState } from "react";
import type { Listing, ListingCategory } from "../types/listing";
import { fetchListings } from "../lib/api";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { SearchBar } from "../components/SearchBar";
import { PromoBanner } from "../components/PromoBanner";
import { ListingCard } from "../components/ListingCard";
import styles from "./Home.module.css";

export function Home() {
  const [category, setCategory] = useState<ListingCategory>("house");
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchListings()
      .then((data) => {
        if (!cancelled) setListings(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load listings.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return (listings ?? []).filter((listing) => {
      if (listing.category !== category) return false;
      if (!normalizedQuery) return true;
      return listing.title.toLowerCase().includes(normalizedQuery);
    });
  }, [listings, category, query]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.topRow}>
            <h1 className={styles.heading}>Houses & Gadgets</h1>
            <div className={styles.searchCorner}>
              <div className={styles.searchBarSlot}>
                <SearchBar value={query} onChange={setQuery} />
              </div>
              <CategoryDropdown active={category} onChange={setCategory} />
            </div>
          </div>
          <PromoBanner
            title="Move-in ready homes, delivered gadgets"
            subtitle="Inquire or order in one tap via WhatsApp"
          />
        </div>
      </header>

      <div className={styles.content}>
        {error && <div className={styles.empty}>{error}</div>}
        {!error && listings === null && <div className={styles.empty}>Loading listings…</div>}
        {!error && listings !== null && filteredListings.length === 0 && (
          <div className={styles.empty}>No listings match "{query}".</div>
        )}
        {listings !== null && filteredListings.length > 0 && (
          <div className={styles.grid}>
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

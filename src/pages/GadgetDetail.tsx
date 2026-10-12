import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import type { Listing } from "../types/listing";
import { fetchListingById } from "../lib/api";
import { formatPrice } from "../lib/formatPrice";
import { BackHeader } from "../components/BackHeader";
import { ImageCarousel } from "../components/ImageCarousel";
import { RatingStars } from "../components/RatingStars";
import { InStockBadge } from "../components/InStockBadge";
import { QuantitySelector } from "../components/QuantitySelector";
import { WhatsAppButton } from "../components/WhatsAppButton";
import styles from "./DetailPage.module.css";

export function GadgetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setListing(undefined);
    if (id) {
      fetchListingById(id)
        .then((data) => {
          if (!cancelled) setListing(data);
        })
        .catch(() => {
          if (!cancelled) setListing(null);
        });
    } else {
      setListing(null);
    }
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (listing === undefined) {
    return <div className={styles.page}>Loading…</div>;
  }

  if (!listing || listing.category !== "gadget") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <BackHeader title="Gadget Detail" />
      </div>

      <div className={styles.media}>
        <ImageCarousel images={listing.images} alt={listing.title} />
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{listing.title}</p>
        <p className={styles.brand}>{listing.brand}</p>

        <div className={styles.ratingRow}>
          {listing.rating !== undefined && (
            <RatingStars rating={listing.rating} reviewCount={listing.reviewCount} />
          )}
          {listing.inStock !== undefined && <InStockBadge inStock={listing.inStock} />}
        </div>

        <p className={styles.price}>{formatPrice(listing.price)}</p>

        <div className={styles.quantityRow}>
          <span className={styles.sectionLabel}>Quantity</span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        <p className={styles.sectionLabel}>Description</p>
        <p className={styles.description}>{listing.description}</p>

        <p className={styles.sectionLabel}>Sold by</p>
        <p className={styles.seller}>{listing.sellerName}</p>
      </div>

      <div className={styles.ctaBar}>
        <WhatsAppButton
          label="Order via WhatsApp"
          onClick={() => navigate(`/order/${listing.id}?quantity=${quantity}`)}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import type { Listing } from "../types/listing";
import { fetchListingById } from "../lib/api";
import { formatPrice } from "../lib/formatPrice";
import { BackHeader } from "../components/BackHeader";
import { ImageCarousel } from "../components/ImageCarousel";
import { VideoGallery } from "../components/VideoGallery";
import { WhatsAppButton } from "../components/WhatsAppButton";
import styles from "./DetailPage.module.css";

export function HouseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setListing(undefined);
    if (id) {
      fetchListingById(id).then((data) => {
        if (!cancelled) setListing(data);
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

  if (!listing || listing.category !== "house") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <BackHeader title="House Detail" />
      </div>

      <div className={styles.media}>
        <ImageCarousel images={listing.images} alt={listing.title} />
        {listing.videos && listing.videos.length > 0 && <VideoGallery videos={listing.videos} />}
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{listing.title}</p>
        <p className={styles.location}>{listing.location}</p>
        <p className={styles.price}>{formatPrice(listing.price)}</p>

        <div className={styles.statRow}>
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          <span>{listing.sqft?.toLocaleString()} sqft</span>
        </div>

        <p className={styles.sectionLabel}>Description</p>
        <p className={styles.description}>{listing.description}</p>

        <p className={styles.sectionLabel}>Listed by</p>
        <p className={styles.seller}>{listing.sellerName}</p>
      </div>

      <div className={styles.ctaBar}>
        <WhatsAppButton
          label="Inquire via WhatsApp"
          onClick={() => navigate(`/order/${listing.id}`)}
        />
      </div>
    </div>
  );
}

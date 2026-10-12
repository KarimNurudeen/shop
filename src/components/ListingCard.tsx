import type { KeyboardEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaLocationDot, FaStar } from "react-icons/fa6";
import type { Listing } from "../types/listing";
import { formatPrice } from "../lib/formatPrice";
import { InStockBadge } from "./InStockBadge";
import styles from "./ListingCard.module.css";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const navigate = useNavigate();
  const detailPath = `/${listing.category}/${listing.id}`;
  const orderPath = `/order/${listing.id}`;
  const isHouse = listing.category === "house";

  const goToDetail = () => navigate(detailPath);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetail();
    }
  };

  const handleCheckout = (event: MouseEvent) => {
    event.stopPropagation();
    navigate(orderPath);
  };

  return (
    <div
      className={styles.card}
      role="link"
      tabIndex={0}
      aria-label={`${listing.title} — view details`}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.imageWrap}>
        <img src={listing.images[0]} alt={listing.title} className={styles.image} />
        {listing.rating !== undefined && (
          <span className={styles.ratingBadge}>
            <FaStar aria-hidden="true" className={styles.ratingIcon} />
            {listing.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{listing.title}</p>
        <p className={styles.description}>{listing.description}</p>

        {isHouse ? (
          <p className={styles.locationRow}>
            <FaLocationDot aria-hidden="true" className={styles.locationIcon} />
            {listing.location}
          </p>
        ) : (
          <p className={styles.locationRow}>{listing.brand}</p>
        )}

        <div className={styles.chipRow}>
          {isHouse ? (
            <>
              <span className={styles.chip}>{listing.beds} bed</span>
              <span className={styles.chip}>{listing.baths} bath</span>
            </>
          ) : (
            listing.inStock !== undefined && <InStockBadge inStock={listing.inStock} />
          )}
        </div>

        <p className={styles.price}>{formatPrice(listing.price)}</p>

        <button type="button" className={styles.checkoutButton} onClick={handleCheckout}>
          <FaWhatsapp aria-hidden="true" className={styles.checkoutIcon} />
          {isHouse ? "Inquire via WhatsApp" : "Order via WhatsApp"}
        </button>
      </div>
    </div>
  );
}

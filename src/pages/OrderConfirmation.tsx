import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { Listing } from "../types/listing";
import { fetchListingById } from "../lib/api";
import { buildOrderMessage } from "../lib/buildOrderMessage";
import { buildWhatsAppLink } from "../lib/buildWhatsAppLink";
import { useOrder } from "../context/OrderContext";
import { BackHeader } from "../components/BackHeader";
import { WhatsAppButton } from "../components/WhatsAppButton";
import styles from "./OrderConfirmation.module.css";

export function OrderConfirmation() {
  const { lastOrder } = useOrder();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    if (lastOrder?.listingId) {
      fetchListingById(lastOrder.listingId).then((data) => {
        if (!cancelled) setListing(data);
      });
    } else {
      setListing(null);
    }
    return () => {
      cancelled = true;
    };
  }, [lastOrder?.listingId]);

  if (!lastOrder) {
    return <Navigate to="/" replace />;
  }

  if (listing === undefined) {
    return <div className={styles.page}>Loading…</div>;
  }

  if (!listing) {
    return <Navigate to="/" replace />;
  }

  const message = buildOrderMessage(lastOrder, listing);
  const whatsAppLink = buildWhatsAppLink(message);

  return (
    <div className={styles.page}>
      <BackHeader title="Order Sent" />

      <div className={styles.confirmationCard}>
        <p className={styles.confirmationTitle}>Ready to send</p>
        <p className={styles.confirmationSubtitle}>
          Review the message below, then open WhatsApp to send it to the seller.
        </p>
      </div>

      <pre className={styles.messagePreview}>{message}</pre>

      <WhatsAppButton as="link" href={whatsAppLink} label="Open WhatsApp Chat" />
    </div>
  );
}

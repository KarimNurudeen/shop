import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { Listing } from "../types/listing";
import { fetchListingById, submitOrder } from "../lib/api";
import { useOrder } from "../context/OrderContext";
import { BackHeader } from "../components/BackHeader";
import { TextField } from "../components/TextField";
import { TextAreaField } from "../components/TextAreaField";
import { QuantitySelector } from "../components/QuantitySelector";
import { WhatsAppButton } from "../components/WhatsAppButton";
import styles from "./OrderForm.module.css";

export function OrderForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLastOrder } = useOrder();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressOrViewingLocation, setAddressOrViewingLocation] = useState("");
  const [quantity, setQuantity] = useState(Number(searchParams.get("quantity")) || 1);
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [notes, setNotes] = useState("");

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

  if (!listing) {
    return <Navigate to="/" replace />;
  }

  const isHouse = listing.category === "house";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const order = {
      fullName,
      phone,
      addressOrViewingLocation,
      quantity: isHouse ? undefined : quantity,
      preferredDateTime: isHouse ? preferredDateTime : undefined,
      notes,
      listingId: listing.id,
    };

    try {
      await submitOrder(order);
    } catch {
      // Best-effort logging only — WhatsApp is the actual point of sale,
      // so a backend hiccup shouldn't block the buyer from sending it.
    }

    setLastOrder(order);
    navigate(`/order/${listing.id}/confirmation`);
  };

  return (
    <div className={styles.page}>
      <BackHeader title="WhatsApp Order Form" />

      <p className={styles.summary}>
        {isHouse ? "Inquiring about" : "Ordering"}: <strong>{listing.title}</strong>
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField label="Full name" value={fullName} onChange={setFullName} required />
        <TextField
          label="Phone number"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="+233 24 123 4567"
          required
        />
        <TextField
          label={isHouse ? "Viewing location" : "Delivery address"}
          value={addressOrViewingLocation}
          onChange={setAddressOrViewingLocation}
          required
        />

        {isHouse ? (
          <TextField
            label="Preferred viewing date & time"
            type="datetime-local"
            value={preferredDateTime}
            onChange={setPreferredDateTime}
          />
        ) : (
          <div className={styles.quantityRow}>
            <span className={styles.quantityLabel}>Quantity</span>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>
        )}

        <TextAreaField
          label="Notes (optional)"
          value={notes}
          onChange={setNotes}
          placeholder="Anything else the seller should know"
        />

        <WhatsAppButton label="Send order to WhatsApp" type="submit" />
      </form>
    </div>
  );
}

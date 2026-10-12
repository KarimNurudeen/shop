import { FaWhatsapp } from "react-icons/fa6";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Houses & Gadgets</p>
        <p className={styles.tagline}>Move-in ready homes, delivered gadgets.</p>

        <div className={styles.whatsappBadge}>
          <FaWhatsapp aria-hidden="true" className={styles.whatsappIcon} />
          <span>Every order is handled directly over WhatsApp</span>
        </div>

        <p className={styles.copyright}>© 2026 Houses & Gadgets. All rights reserved.</p>
      </div>
    </footer>
  );
}

import { FaWhatsapp } from "react-icons/fa6";
import styles from "./WhatsAppButton.module.css";

type WhatsAppButtonProps = {
  label: string;
} & (
  | { as?: "button"; type?: "button" | "submit"; onClick?: () => void; href?: never }
  | { as: "link"; href: string; onClick?: never; type?: never }
);

// Styled per figma-handoff.md §2: CTA buttons moved off WhatsApp-brand
// green onto the dark-blue token as part of the red/blue/dark-blue/black palette.
// The WhatsApp glyph itself stays, since it's the whole point of the CTA.
export function WhatsAppButton(props: WhatsAppButtonProps) {
  if (props.as === "link") {
    return (
      <a className={styles.button} href={props.href} target="_blank" rel="noreferrer">
        <FaWhatsapp aria-hidden="true" className={styles.icon} />
        {props.label}
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} className={styles.button} onClick={props.onClick}>
      <FaWhatsapp aria-hidden="true" className={styles.icon} />
      {props.label}
    </button>
  );
}

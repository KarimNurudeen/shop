import { WHATSAPP_PHONE_NUMBER } from "../config";

export function buildWhatsAppLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${text}`;
}

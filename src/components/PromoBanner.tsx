import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./PromoBanner.module.css";

type PromoBannerProps = {
  title: string;
  subtitle: string;
};

const ENTRANCE_DELAY_MS = 300;
const REAPPEAR_DELAY_MS = 45000;
const DISMISS_THRESHOLD_PX = 40;

export function PromoBanner({ title, subtitle }: PromoBannerProps) {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), ENTRANCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) return;
    const timer = setTimeout(() => setVisible(true), REAPPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartY.current = event.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const delta = event.clientY - dragStartY.current;
    setDragY(Math.min(0, delta));
  };

  const endDrag = () => {
    if (dragY < -DISMISS_THRESHOLD_PX) {
      setVisible(false);
    }
    setDragY(0);
    setIsDragging(false);
    dragStartY.current = null;
  };

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.visible : styles.hidden} ${isDragging ? styles.dragging : ""}`}
      style={isDragging ? { transform: `translateY(${dragY}px)` } : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

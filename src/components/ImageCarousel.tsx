import { useState, type MouseEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./ImageCarousel.module.css";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  fill?: boolean; // fill the parent edge-to-edge (used as a full-viewport background)
};

export function ImageCarousel({ images, alt, fill }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const showDot = (index: number) => (event: MouseEvent) => {
    event.stopPropagation();
    setActiveIndex(index);
  };

  const showPrev = (event: MouseEvent) => {
    event.stopPropagation();
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = (event: MouseEvent) => {
    event.stopPropagation();
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className={fill ? styles.wrapperFill : styles.wrapper}>
      <img className={fill ? styles.imageFill : styles.image} src={images[activeIndex]} alt={alt} />

      {images.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={showPrev}
            aria-label="Previous photo"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={showNext}
            aria-label="Next photo"
          >
            <FaChevronRight aria-hidden="true" />
          </button>

          <div className={styles.dots}>
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === activeIndex ? styles.dotActive : styles.dot}
                aria-label={`Show photo ${index + 1}`}
                onClick={showDot(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

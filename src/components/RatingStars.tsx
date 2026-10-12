import { FaStar, FaRegStar } from "react-icons/fa6";
import styles from "./RatingStars.module.css";

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  light?: boolean; // use on dark/glass backgrounds
};

const STAR_COUNT = 5;

export function RatingStars({ rating, reviewCount, light }: RatingStarsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stars} aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: STAR_COUNT }, (_, index) => {
          const filled = index < Math.round(rating);
          return filled ? (
            <FaStar key={index} className={styles.starFilled} />
          ) : (
            <FaRegStar key={index} className={styles.starEmpty} />
          );
        })}
      </div>
      <span className={light ? styles.ratingValueLight : styles.ratingValue}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={light ? styles.reviewCountLight : styles.reviewCount}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

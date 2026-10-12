import styles from "./InStockBadge.module.css";

type InStockBadgeProps = {
  inStock: boolean;
};

export function InStockBadge({ inStock }: InStockBadgeProps) {
  return (
    <span className={inStock ? styles.inStock : styles.outOfStock}>
      {inStock ? "In stock" : "Out of stock"}
    </span>
  );
}

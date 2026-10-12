import { FaMinus, FaPlus } from "react-icons/fa6";
import styles from "./QuantitySelector.module.css";

type QuantitySelectorProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
};

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <FaMinus aria-hidden="true" />
      </button>
      <span className={styles.value}>{value}</span>
      <button
        type="button"
        className={styles.button}
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <FaPlus aria-hidden="true" />
      </button>
    </div>
  );
}

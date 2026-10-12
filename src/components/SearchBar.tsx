import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Search listings" }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <FaMagnifyingGlass className={styles.icon} aria-hidden="true" />
      <input
        className={styles.input}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}

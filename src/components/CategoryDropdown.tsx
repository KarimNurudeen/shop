import type { ListingCategory } from "../types/listing";
import styles from "./CategoryDropdown.module.css";

type CategoryDropdownProps = {
  active: ListingCategory;
  onChange: (category: ListingCategory) => void;
};

const OPTIONS: { key: ListingCategory; label: string }[] = [
  { key: "house", label: "Houses" },
  { key: "gadget", label: "Electrical Gadgets" },
];

export function CategoryDropdown({ active, onChange }: CategoryDropdownProps) {
  return (
    <select
      className={styles.select}
      value={active}
      onChange={(event) => onChange(event.target.value as ListingCategory)}
      aria-label="Category"
    >
      {OPTIONS.map((option) => (
        <option key={option.key} value={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

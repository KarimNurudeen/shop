import styles from "./TextField.module.css";

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

export function TextAreaField({ label, value, onChange, placeholder }: TextAreaFieldProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <textarea
        className={styles.input}
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

import styles from "./TextField.module.css";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: TextFieldProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </span>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

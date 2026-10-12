import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./BackHeader.module.css";

type BackHeaderProps = {
  title: string;
};

export function BackHeader({ title }: BackHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <FaArrowLeft aria-hidden="true" />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

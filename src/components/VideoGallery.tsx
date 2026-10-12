import { useState } from "react";
import styles from "./VideoGallery.module.css";

type VideoGalleryProps = {
  videos: string[];
};

// Displays the shot/walkthrough videos for a house listing.
// See figma-handoff.md — added after the original readme/Figma screens.
export function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <video className={styles.video} src={videos[activeIndex]} controls playsInline />
      {videos.length > 1 && (
        <div className={styles.tabs}>
          {videos.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === activeIndex ? styles.tabActive : styles.tab}
              onClick={() => setActiveIndex(index)}
            >
              Clip {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

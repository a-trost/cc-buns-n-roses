import React from "react";
import styles from "./PatternLibrary.module.scss";

export default function PatternLibrary() {
  return <div></div>;
}

export const ColorFamily = ({ color }) => {
  return (
    <div className={styles.colorFamily}>
      <span className={styles.colorLabel}>{color}</span>
      <div className={styles.colorGrid}>
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((i) => (
          <ColorSwatch key={i} number={i} color={`var(--${color}-${i})`} />
        ))}
      </div>
    </div>
  );
};

export function ColorSwatch({ color, number }) {
  return (
    <div>
      <div className={styles.swatch} style={{ "--color": color }}></div>
      {number}
    </div>
  );
}

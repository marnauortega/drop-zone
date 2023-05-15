import styles from "./DashedAnimation.module.css";

const DashedAnimation = ({ sectors, dragging }) => {
  return (
    <div className={`${styles.wrapper} ${dragging ? styles.dragging : ""}`}>
      {range(sectors).map((s, index) => (
        <div
          key={index}
          className={styles.sector}
          style={{ transform: `rotate(${75 + (360 / sectors) * index}deg) skew(${(360 * 2) / sectors}deg)` }}
        ></div>
      ))}
    </div>
  );
};

const range = (start, end, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};

export default DashedAnimation;

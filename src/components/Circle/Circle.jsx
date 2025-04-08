import cn from "classnames";
import styles from "./circle.module.scss";

export default function Circle({ use, children }) {
  return <div className={cn(styles.circle, styles[`circle--${use}`])}>{children}</div>;
}

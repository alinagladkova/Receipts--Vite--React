import cn from "classnames";
import styles from "./tab.module.scss";

export default function Tab({ text, active, handler }) {
  return (
    <span className={cn(styles.tab, active ? styles[`tab--active`] : "")} onClick={handler}>
      {text}
    </span>
  );
}

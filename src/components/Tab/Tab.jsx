import cn from "classnames";
import styles from "./tab.module.scss";

export default function Tab({ children, active }) {
  return <div className={cn(styles.tab, active ? styles[`tab--active`] : "")}>{children}</div>;
}

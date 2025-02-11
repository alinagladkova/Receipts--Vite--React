import cn from "classnames";
import styles from "./tabContent.module.scss";

export default function TabContent({ text, active }) {
  return <div className={cn(styles[`tab-content`], active ? styles[`tab-content--active`] : "")}>{text}</div>;
}

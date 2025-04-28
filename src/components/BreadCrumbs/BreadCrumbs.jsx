import cn from "classnames";
import styles from "./breadCrumbs.module.scss";

export default function BreadCrumbs({ children }) {
  return <div className={cn(styles.breadcrumbs)}>{children}</div>;
}

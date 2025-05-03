import cn from "classnames";
import styles from "./tag.module.scss";
import { CiShoppingTag } from "react-icons/ci";

export default function Tag({ children }) {
  return (
    <li className={cn(styles.tag)}>
      <CiShoppingTag />
      <span className={cn(styles[`tag__title`])}>{children}</span>
    </li>
  );
}

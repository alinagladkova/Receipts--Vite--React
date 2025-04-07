import cn from "classnames";
import styles from "./favoriteListItem.module.scss";

export default function FavoriteListItem({}) {
  return (
    <li className={cn(styles[`favorite-item`])}>
      <span className={cn(styles[`favorite-item__title`])}>hello</span>
    </li>
  );
}

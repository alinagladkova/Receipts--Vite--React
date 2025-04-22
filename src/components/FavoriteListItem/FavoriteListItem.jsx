import cn from "classnames";
import styles from "./favoriteListItem.module.scss";
import Button from "../Button/Button";
import { IoMdClose } from "react-icons/io";

export default function FavoriteListItem({ children, handleToFavorite }) {
  return (
    <li className={cn(styles[`favorite-list-item`])}>
      <span className={cn(styles[`favorite-list-item__title`])}>{children}</span>
      <Button use="stealth" handler={handleToFavorite}>
        <IoMdClose />
      </Button>
    </li>
  );
}

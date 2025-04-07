import cn from "classnames";
import styles from "./favoriteList.module.scss";
import { useState } from "react";
import FavoriteListItem from "../FavoriteListItem/FavoriteListItem";

export default function FavoriteList({}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenFavorite = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={cn(styles[`favorite-list`])}>
      <div className={cn(styles[`favorite-list__top`])}>
        <h6 className={cn(styles[`favorite-list__title`])} onClick={handleOpenFavorite}>
          Favorite recipes
          <div className={cn(styles[`favorite-list__amount`])}>
            <span>89</span>
          </div>
        </h6>
      </div>
      <ul className={cn(styles[`favorite-list__list`], isOpen ? styles[`favorite-list__list--active`] : "")}>
        <FavoriteListItem></FavoriteListItem>
        <FavoriteListItem></FavoriteListItem>
      </ul>
    </div>
  );
}

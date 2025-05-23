import cn from "classnames";
import styles from "./favoriteList.module.scss";
import { useState } from "react";
import FavoriteListItem from "../FavoriteListItem/FavoriteListItem";
import Circle from "../Circle/Circle";

export default function FavoriteList({ favoriteRecipes, handleToFavorite }) {
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
            <Circle use="primary">{favoriteRecipes.length}</Circle>
          </div>
        </h6>
      </div>
      <ul className={cn(styles[`favorite-list__list`], isOpen ? styles[`favorite-list__list--active`] : "")}>
        {favoriteRecipes.map((item) => (
          <FavoriteListItem key={item.id} handleToFavorite={() => handleToFavorite(item.id)}>
            {item.name}
          </FavoriteListItem>
        ))}
      </ul>
    </div>
  );
}

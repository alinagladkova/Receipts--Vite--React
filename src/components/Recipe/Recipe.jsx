import cn from "classnames";
import styles from "./recipe.module.scss";
import Tag from "../Tag/Tag";
import Rating from "../Rating/Rating";
import Tabs from "../Tabs/Tabs";
import Tab from "../Tab/Tab";
import Button from "../Button/Button";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useState } from "react";

export default function Recipe({ recipe, handleOpenActiveModal, handleAddFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = (recipe) => {
    setIsFavorite((prev) => !prev);
    handleAddFavorite(recipe);
  };

  return (
    <div className={cn(styles.recipe)}>
      <div className={cn(styles[`recipe__btn`])}>
        <Button use="add-favorite" handler={() => handleAddToFavorite(recipe)}>
          {!isFavorite ? <MdOutlineFavoriteBorder /> : <MdOutlineFavorite />}
        </Button>
      </div>
      <div className={cn(styles[`recipe__img-wrapper`])} onClick={() => handleOpenActiveModal(recipe.image)}>
        <img className={cn(styles[`recipe__img`])} src={recipe.image} alt="img" />
      </div>
      <div className={cn(styles[`recipe__info`])}>
        <h3 className={cn(styles[`recipe__title`])}>{recipe.name}</h3>
        <Rating defaultRating={recipe.rating} maxValue={5} />
        <Tabs defaultActive={0}>
          <Tab title="description">
            <p className={cn(styles[`recipe__desc-item`])}>
              <span className={cn(styles[`recipe__desc-title`])}>CookTime: </span>
              {recipe.cookTimeMinutes} mins
            </p>
            <p className={cn(styles[`recipe__desc-item`])}>
              <span className={cn(styles[`recipe__desc-title`])}>Servings: </span>
              {recipe.servings}
            </p>
            <p className={cn(styles[`recipe__desc-item`])}>
              <span className={cn(styles[`recipe__desc-title`])}>Difficulty: </span>
              {recipe.difficulty}
            </p>
            <p className={cn(styles[`recipe__desc-item`])}>
              <span className={cn(styles[`recipe__desc-title`])}>Cuisine: </span>
              {recipe.cuisine}
            </p>
            <p className={cn(styles[`recipe__desc-item`])}>
              <span className={cn(styles[`recipe__desc-title`])}>Calories per serving: </span>
              {recipe.caloriesPerServing}
            </p>
            <div className={cn(styles[`recipe__tags`])}>
              {recipe.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Tab>
          <Tab title="ingridients" disabled>
            {recipe.ingredients.map((el, i) => (
              <p key={i}>{el}</p>
            ))}
          </Tab>
          <Tab title="instructions">
            {recipe.instructions.map((el, i) => (
              <span key={i}>{el}&nbsp;</span>
            ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

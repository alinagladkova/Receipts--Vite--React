import cn from "classnames";
import styles from "./recipe.module.scss";
import Tag from "../Tag/Tag";

export default function Recipe({ recipe }) {
  console.log(recipe);

  return (
    <div className={cn(styles.recipe)}>
      <div className={cn(styles[`recipe__img-wrapper`])}>
        <img className={cn(styles[`recipe__img`])} src={recipe.image} alt="img" />
      </div>
      <div className={cn(styles[`recipe__info`])}>
        <h3 className={cn(styles[`recipe__title`])}>{recipe.name}</h3>
        <span className={cn(styles[`recipe__rating`])}>{recipe.rating}</span>
        <div className={cn(styles[`recipe__tags`])}>
          <Tag />
        </div>
      </div>
    </div>
  );
}

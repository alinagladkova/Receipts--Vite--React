import cn from "classnames";
import styles from "./recipe.module.scss";
import Tag from "../Tag/Tag";
import Rating from "../Rating/Rating";
import Tabs from "../Tabs/Tabs";

export default function Recipe({ recipe }) {
  let tabsArray = ["description", "ingridients", "instructions"];

  return (
    <div className={cn(styles.recipe)}>
      <div className={cn(styles[`recipe__img-wrapper`])}>
        <img className={cn(styles[`recipe__img`])} src={recipe.image} alt="img" />
      </div>
      <div className={cn(styles[`recipe__info`])}>
        <h3 className={cn(styles[`recipe__title`])}>{recipe.name}</h3>
        <Rating defaultRating={recipe.rating} maxValue={5} />
        <Tabs tabsArray={tabsArray} />
        <div className={cn(styles[`recipe__tags`])}>
          <Tag />
        </div>
      </div>
    </div>
  );
}

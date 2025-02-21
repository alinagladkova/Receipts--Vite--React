import cn from "classnames";
import styles from "./recipe.module.scss";
import Tag from "../Tag/Tag";
import Rating from "../Rating/Rating";
import Tabs from "../Tabs/Tabs";
import Tab from "../Tab/Tab";

export default function Recipe({ recipe }) {
  return (
    <div className={cn(styles.recipe)}>
      <div className={cn(styles[`recipe__img-wrapper`])}>
        <img className={cn(styles[`recipe__img`])} src={recipe.image} alt="img" />
      </div>
      <div className={cn(styles[`recipe__info`])}>
        <h3 className={cn(styles[`recipe__title`])}>{recipe.name}</h3>
        <Rating defaultRating={recipe.rating} maxValue={5} />
        <Tabs>
          <Tab title="ingridients">{recipe.ingredients}</Tab>
          <Tab title="instructions">{recipe.instructions}</Tab>
          <Tab title="description">111</Tab>
        </Tabs>
        <div className={cn(styles[`recipe__tags`])}>
          <Tag />
        </div>
      </div>
    </div>
  );
}

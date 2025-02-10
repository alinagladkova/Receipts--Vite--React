import cn from "classnames";
import styles from "./recipe.module.scss";
import Tag from "../Tag/Tag";
import Tab from "../Tab/Tab";
import Rating from "../Rating/Rating";
import { useState } from "react";
import Button from "../Button/Button";

export default function Recipe({ recipe }) {
  let tabsArray = ["description", "ingridients", "instructions"];
  const [activeTab, setActiveTab] = useState("description");

  const handleDescriptionShow = (text) => {
    tabsArray.find((tab) => {
      if (tab === text.toLowerCase()) {
        setActiveTab(tab);
      }
    });
  };

  const handleIngridientsShow = (text) => {
    tabsArray.find((tab) => {
      if (tab === text.toLowerCase()) {
        setActiveTab(tab);
      }
    });
  };

  const handleInstructionsShow = (text) => {
    tabsArray.find((tab) => {
      if (tab === text.toLowerCase()) {
        setActiveTab(tab);
      }
    });
  };

  return (
    <div className={cn(styles.recipe)}>
      <div className={cn(styles[`recipe__img-wrapper`])}>
        <img className={cn(styles[`recipe__img`])} src={recipe.image} alt="img" />
      </div>
      <div className={cn(styles[`recipe__info`])}>
        <h3 className={cn(styles[`recipe__title`])}>{recipe.name}</h3>
        <div className={cn(styles[`recipe__rating`])}>
          <Rating rating={recipe.rating} />
        </div>
        <div className={cn(styles[`recipe__tabs-control`])}>
          <div className={cn(styles[`recipe__btn`])}>
            <Button use="openTab" text="Description" handler={handleDescriptionShow} />
          </div>
          <div className={cn(styles[`recipe__btn`])}>
            <Button use="openTab" text="Ingridients" handler={handleIngridientsShow} />
          </div>
          <div className={cn(styles[`recipe__btn`])}>
            <Button use="openTab" text="Instructions" handler={handleInstructionsShow} />
          </div>
        </div>
        <div className={cn(styles[`recipe__tab-data`])}>
          <Tab data={activeTab} content={recipe.activeTab} />
        </div>

        {/* <span className={cn(styles[`recipe__difficulty`])}>{recipe.difficulty}</span>
        <span className={cn(styles[`recipe__cuisine`])}>{recipe.cuisine}</span>
        <span className={cn(styles[`recipe__servings`])}>{recipe.servings}</span>
        <span className={cn(styles[`recipe__time`])}>{recipe.cookTimeMinutes}</span>
        <span className={cn(styles[`recipe__calories`])}>{recipe.caloriesPerServing}</span> */}
        <div className={cn(styles[`recipe__tags`])}>
          <Tag />
        </div>
      </div>
    </div>
  );
}

import cn from "classnames";
import styles from "./tabs.module.scss";
import Tab from "../Tab/Tab";
import TabContent from "../TabContent/TabContent";
import { useState } from "react";

export default function Tabs({ tabsArray }) {
  const [isActive, setIsActive] = useState(0);

  return (
    <div className={cn(styles.tabs)}>
      <div className={cn(styles[`tabs__control`])}>
        {tabsArray.map((tab, i) => (
          <Tab text={tab} active={isActive === i} handler={() => setIsActive(i)} key={tab} />
        ))}
      </div>
      <div className={cn(styles[`tabs__content`])}>
        <TabContent text="hello" active={isActive === 0} />
        <TabContent text="hello1" active={isActive === 1} />
        <TabContent text="hello2" active={isActive === 2} />
      </div>
    </div>
  );
}

{
  /* <span className={cn(styles[`recipe__difficulty`])}>{recipe.difficulty}</span>
        <span className={cn(styles[`recipe__cuisine`])}>{recipe.cuisine}</span>
        <span className={cn(styles[`recipe__servings`])}>{recipe.servings}</span>
        <span className={cn(styles[`recipe__time`])}>{recipe.cookTimeMinutes}</span>
        <span className={cn(styles[`recipe__calories`])}>{recipe.caloriesPerServing}</span> */
}

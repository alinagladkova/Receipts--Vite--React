import cn from "classnames";
import styles from "./tabs.module.scss";
import Tab from "../Tab/Tab";
import TabContent from "../TabContent/TabContent";
import { useState } from "react";

export default function Tabs() {
  const [isActive, setIsActive] = useState(1);

  return (
    <div className={cn(styles.tabs)}>
      <div className={cn(styles[`tabs__control`])}>
        <Tab text="description" active={isActive === 1} handler={() => setIsActive(1)} />
        <Tab text="ingridients" active={isActive === 2} handler={() => setIsActive(2)} />
        <Tab text="instructions" active={isActive === 3} handler={() => setIsActive(3)} />
      </div>
      <div className={cn(styles[`tabs__content`])}>
        <TabContent text="hello" active={isActive === 1} />
        <TabContent text="hello1" active={isActive === 2} />
        <TabContent text="hello2" active={isActive === 3} />
      </div>
    </div>
  );
}

import cn from "classnames";
import styles from "./tabs.module.scss";
import { useState, cloneElement } from "react";

export default function Tabs({ children }) {
  const [isActive, setIsActive] = useState(0);

  const childrenModify = children.map((child, i) => {
    return cloneElement(child, {
      active: isActive === i,
    });
  });

  return (
    <div className={cn(styles.tabs)}>
      <div className={cn(styles[`tabs__control`])}>
        {children.map((el, i) => (
          <span className={cn(styles[`tabs__control-item`], isActive === i ? styles[`tabs__control-item--active`] : "")} onClick={() => setIsActive(i)}>
            {el.props.title}
          </span>
        ))}
      </div>
      <div className={cn(styles[`tabs__content`])}>{childrenModify}</div>
    </div>
  );
}

import cn from "classnames";
import styles from "./tabs.module.scss";
import { useState, cloneElement } from "react";

export default function Tabs({ defaultActive, children }) {
  if (typeof defaultActive !== "number" || defaultActive < 0 || defaultActive > children) {
    defaultActive = 0;
  }

  const [isActive, setIsActive] = useState(defaultActive ? defaultActive : 0);

  const childrenModify = children.map((child, i) => {
    return cloneElement(child, {
      active: isActive === i,
      key: i,
    });
  });

  return (
    <div className={cn(styles.tabs)}>
      <div className={cn(styles[`tabs__control`])}>
        {children.map((el, i) => (
          <span
            className={cn(styles[`tabs__control-item`], isActive === i ? styles[`tabs__control-item--active`] : "")}
            key={i}
            onClick={() => !el.props.disabled && setIsActive(i)}
          >
            {el.props.title}
          </span>
        ))}
      </div>
      <div className={cn(styles[`tabs__content`])}>{childrenModify}</div>
    </div>
  );
}

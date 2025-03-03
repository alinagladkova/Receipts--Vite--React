import cn from "classnames";
import styles from "./tabs.module.scss";
import { useState, cloneElement } from "react";

export default function Tabs({ dafaultActive, children }) {
  // const [isActive, setIsActive] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const childrenModify = children.map((child, i) => {
    return cloneElement(child, {
      // active: isActive === i,
      active: dafaultActive === child.props.title,
    });
  });

  return (
    <div className={cn(styles.tabs)}>
      <div className={cn(styles[`tabs__control`])}>
        {children.map((el, i) => (
          // <span className={cn(styles[`tabs__control-item`], isActive === i ? styles[`tabs__control-item--active`] : "")} key={i} onClick={() => setIsActive(i)}>
          //   {el.props.title}
          // </span>
          <span className={cn(styles[`tabs__control-item`], isActive ? styles[`tabs__control-item--active`] : "")} key={i} onClick={() => setIsActive(true)}>
            {el.props.title}
          </span>
        ))}
      </div>
      <div className={cn(styles[`tabs__content`])}>{childrenModify}</div>
    </div>
  );
}

//23 требует unique key
//чтоб можно было поставить на вкладку снаружи disabled
//prop в tabs, который по дефолту ставит активный таб
//дать возможность управлять tabs cнаружи (не заходя в него)
//тэги

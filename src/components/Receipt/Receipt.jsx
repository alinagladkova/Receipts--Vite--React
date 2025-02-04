import cn from "classnames";
import styles from "./receipt.module.scss";
import Tag from "../Tag/Tag";

export default function Receipt() {
  return (
    <div className={cn(styles.receipt)}>
      <div className={cn(styles[`receipt__img-wrapper`])}>
        <img className={cn(styles[`receipt__img`])} src="" alt="" />
      </div>
      <div className={cn(styles[`receipt__info`])}>
        <h3 className={cn(styles[`receipt__title`])}></h3>
        <span className={cn(styles[`receipt__rating`])}></span>
        <div className={cn(styles[`receipt__tags`])}>
          <Tag />
        </div>
      </div>
    </div>
  );
}

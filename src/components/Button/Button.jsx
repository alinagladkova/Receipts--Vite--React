import cn from "classnames";
import styles from "./button.module.scss";

export default function Button({ use, text, handler }) {
  return (
    <div className={cn(styles.button, styles[`button--${use}`])} onClick={() => handler(text)}>
      {text}
    </div>
  );
}

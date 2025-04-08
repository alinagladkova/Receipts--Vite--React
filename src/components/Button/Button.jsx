import cn from "classnames";
import styles from "./button.module.scss";

export default function Button({ use, children, handler }) {
  return (
    <button className={cn(styles.button, styles[`button--${use}`])} onClick={() => handler()}>
      {children}
    </button>
  );
}

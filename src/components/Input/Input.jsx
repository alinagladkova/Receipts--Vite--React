import cn from "classnames";
import styles from "./input.module.scss";

export default function Input({ name, value, type, placeholder, min, max, hidden, handler = () => {} }) {
  return (
    <input
      className={cn(styles.input)}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      hidden={hidden}
      onChange={(e) => handler(e.target.value)}
    ></input>
  );
}

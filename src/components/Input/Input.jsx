import cn from "classnames";
import styles from "./input.module.scss";

export default function Input({ name, value, type, placeholder, hidden, handler = () => {} }) {
  return (
    <input
      className={cn(styles.input)}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      hidden={hidden}
      onChange={(e) => handler(e.target.value)}
    ></input>
  );
}

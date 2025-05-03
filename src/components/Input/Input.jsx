import cn from "classnames";
import styles from "./input.module.scss";
import { useState } from "react";

export default function Input({ name, value, type, placeholder, hidden, handler = () => {} }) {
  // const [value, setValue] = useState("");

  // const inputAction = (e) => {
  //   // e.preventDefault();

  //   setValue(e.target.value.trim());
  //   handler(e.target.value.trim())

  //   // if (type === "text") {
  //   //   return handler(e.target.value.trim());
  //   // }
  // };

  return (
    <input
      className={cn(styles.input)}
      name={name}
      type={type}
      placeholder={placeholder}
      hidden={hidden}
      value={value}
      onChange={(e) => handler(e.target.value)}
    ></input>
  );
}

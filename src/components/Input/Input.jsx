import cn from "classnames";
import styles from "./input.module.scss";
import { useState } from "react";

export default function Input({ name, type, placeholder, hidden, inputHandler = () => {} }) {
  const [value, setValue] = useState("");

  const inputAction = (e) => {
    e.preventDefault();
    setValue(e.target.value.trim());

    if (type === "text") {
      return inputHandler(e.target.value.trim());
    }
  };

  return <input className={cn(styles.input)} name={name} type={type} placeholder={placeholder} hidden={hidden} onChange={inputAction}></input>;
}

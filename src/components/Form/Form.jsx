import cn from "classnames";
import styles from "./form.module.scss";
import Input from "../Input/Input";
import { useState } from "react";

export default function Form({ preventDefault = true, method = "POST", action = "#" }) {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");

  const handleName = (text) => {
    if (text.length > 5) {
      setErrorName("More than 5 symbols!");
      return;
    }
    setErrorName("");
    setName(text);
  };

  const handleSubmit = (e) => {
    preventDefault && e.preventDefault();
    console.log("submit", name);
  };

  return (
    <form className={cn(styles.form)} method={method} action={action} onSubmit={handleSubmit}>
      <Input name="name" type="text" placeholder="Enter your name" value={name} handler={handleName} />
      {name}
      {errorName && (
        <span className="error" style={{ color: "red" }}>
          {errorName}
        </span>
      )}
    </form>
  );
}

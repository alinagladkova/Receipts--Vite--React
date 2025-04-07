import cn from "classnames";
import styles from "./counterMinus.module.scss";
import Button from "../../Button/Button";
import { useContext } from "react";
import { CounterContext } from "../Counter/Counter";

export default function CounterMinus({}) {
  const { handleMinus } = useContext(CounterContext);
  return (
    <div className={cn(styles[`counter-minus`])}>
      <Button use="minus" text="-" handler={handleMinus} />
    </div>
  );
}

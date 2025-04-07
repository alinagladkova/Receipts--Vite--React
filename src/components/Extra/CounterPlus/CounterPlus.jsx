import cn from "classnames";
import styles from "./counterPlus.module.scss";
import Button from "../../Button/Button";
import { useContext } from "react";
import { CounterContext } from "../Counter/Counter";

export default function CounterPlus({}) {
  const { handlePlus } = useContext(CounterContext);

  return (
    <div className={cn(styles[`counter-plus`])}>
      <Button use="plus" text="+" handler={handlePlus} />
    </div>
  );
}

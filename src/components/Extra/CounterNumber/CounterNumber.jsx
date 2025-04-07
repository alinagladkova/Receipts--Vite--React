import cn from "classnames";
import styles from "./counterNumber.module.scss";
import { useContext } from "react";
import { CounterContext } from "../Counter/Counter";

export default function CounterNumber({}) {
  const { number } = useContext(CounterContext);
  return <div className={cn(styles[`counter-number`])}>{number}</div>;
}

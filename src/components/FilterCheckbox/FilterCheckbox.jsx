import cn from "classnames";
import * as Icon from "react-icons/fi";
import styles from "./filterCheckbox.module.scss";
import Checkbox from "react-custom-checkbox";
import { useEffect, useState } from "react";

export default function FilterCheckbox({ title, data, handleCheckbox }) {
  const [isChecked, setIsChecked] = useState(data);

  useEffect(() => {
    handleCheckbox(isChecked);
  }, [isChecked]);

  return (
    <div className={cn(styles[`filter-checkbox`])}>
      <div className={cn(styles[`filter-checkbox__title`])}>{title}</div>
      <div className={cn(styles[`filter-checkbox__wrapper`])}>
        {data.map((el) => (
          <Checkbox
            icon={<Icon.FiCheck color="rgb(67, 69, 83)" size={14} />}
            name="difficulty"
            key={el.value}
            checked={isChecked.some((item) => item.value === el.value)}
            onChange={(value) => {
              value ? setIsChecked((prev) => [...prev, el]) : setIsChecked((prev) => prev.filter((item) => item.value !== el.value));
            }}
            borderColor="rgb(67, 69, 83)"
            style={{ cursor: "pointer" }}
            label={el.label}
          />
        ))}
      </div>
    </div>
  );
}

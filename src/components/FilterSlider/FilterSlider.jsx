import cn from "classnames";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import styles from "./filterSlider.module.scss";

export default function FilterSlider({ title, min, max, step, handleRange }) {
  const [value, setValue] = useState([max, max]);

  return (
    <div className={cn(styles[`filter-slider`])}>
      <div className={cn(styles[`filter-slider__title`])}>{title}</div>
      <div className={cn(styles[`filter-slider__wrapper`])}>
        <div className={cn(styles[`filter-slider__values`])}>
          <div className={cn(styles[`filter-slider__min`])}>{min}</div>
          <div className={cn(styles[`filter-slider__max`])}>{value[0]}</div>
        </div>
        <RangeSlider
          value={value}
          min={min}
          max={max}
          step={step}
          onInput={(val) => {
            setValue(val);
            handleRange(val[0]);
          }}
        />
      </div>
    </div>
  );
}

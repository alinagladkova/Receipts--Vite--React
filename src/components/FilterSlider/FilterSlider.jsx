import React from "react";
import cn from "classnames";
import styles from "./filterSlider.module.scss";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function FilterSlider({ title }) {
  return (
    <div className={cn(styles[`filter-slider`])}>
      <div className={cn(styles[`filter-slider__title`])}>{title}</div>
      <div className={cn(styles[`filter-slider__wrapper`])}>
        <div className={cn(styles[`filter-slider__range`])}>
          <div className={cn(styles[`filter-slider__min`])}>0</div>
          <div className={cn(styles[`filter-slider__max`])}>100</div>
        </div>
        <RangeSlider min="0" max="100" thumbsDisabled={[true, false]} />
      </div>
    </div>
  );
}

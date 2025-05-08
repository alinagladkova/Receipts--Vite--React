import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import cn from "classnames";
import styles from "./filterSelect.module.scss";

const animatedComponents = makeAnimated();

export default function FilterSelect({ data, title, multi, handleSelect }) {
  return (
    <div className={cn(styles[`filter-select`])}>
      <div className={cn(styles[`filter-select__title`])}>{title}</div>
      <div className={cn(styles[`filter-select__wrapper`])}>
        <Select
          options={data}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti={multi}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderRadius: "10px",
              width: "100%",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              ":hover": {
                ...baseStyles,
                backgroundColor: "rgb(67, 69, 83)",
                color: "white",
              },
            }),
            multiValue: (baseStyles) => ({
              ...baseStyles,
              borderRadius: "5px",
              backgroundColor: "rgb(67, 69, 83)",
            }),
            multiValueLabel: (baseStyles) => ({
              ...baseStyles,
              color: "#fff",
              padding: "3px",
            }),
            multiValueRemove: (baseStyles) => ({
              ...baseStyles,
              color: "#fff",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              minWidth: "200px",
              maxWidth: "80%",
            }),
          }}
          onChange={(newValue) => handleSelect(newValue)}
        />
      </div>
    </div>
  );
}

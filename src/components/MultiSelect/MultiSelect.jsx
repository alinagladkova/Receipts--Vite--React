import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";

//реализовать функционал фильтра handler

const animatedComponents = makeAnimated();

export default function MultiSelect({ data }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isShown, setIsShown] = useState(false);

  //выбираем опцию(tag) из списка и добавляем в поле
  // const handleSelectTag = (tag) => {
  //   const checkTagAdded = selectedOptions.find((option) => option === tag);
  //   if (!checkTagAdded) {
  //     const addedTags = data.filter((option) => option === tag);
  //     setSelectedOptions((prev) => [...prev, ...addedTags]);
  //   }
  // };

  // //на крестик убираем опции из поля
  // const handleRemoveTag = (tag) => {
  //   setSelectedOptions((prev) => prev.filter((option) => option !== tag));
  // };

  return (
    <Select
      defaultValue={data[0]}
      options={data}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "10px",
          minWidth: "200px",
          maxWidth: "80%",
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
    />
  );
}

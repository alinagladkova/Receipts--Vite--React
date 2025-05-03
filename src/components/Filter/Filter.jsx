import cn from "classnames";
import styles from "./filter.module.scss";
import MultiSelect from "../MultiSelect/MultiSelect";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import Button from "../Button/Button";
import { useState } from "react";
import { IconContext } from "react-icons";

export default function Filter({ recipesTags }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(styles.filter)}>
      <Button use="stealth" handler={() => setIsOpen((prev) => !prev)}>
        <IconContext.Provider value={{ color: "rgb(67, 69, 83)" }}>{isOpen ? <VscFilterFilled /> : <VscFilter />}</IconContext.Provider>
      </Button>
      {isOpen && (
        <div className={cn(styles[`filter__multiselect`])}>
          <MultiSelect data={recipesTags}></MultiSelect>
        </div>
      )}
    </div>
  );
}

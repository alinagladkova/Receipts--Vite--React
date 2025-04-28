import cn from "classnames";
import styles from "./filter.module.scss";
import MultiSelect from "../MultiSelect/MultiSelect";
import { VscFilter } from "react-icons/vsc";
import { VscFilterFilled } from "react-icons/vsc";
import Button from "../Button/Button";
import { useState } from "react";

export default function Filter({ recipesTags }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(styles.filter)}>
      <Button use="openFilter" handler={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <VscFilterFilled /> : <VscFilter />}
      </Button>
      {isOpen && (
        <div className={cn(styles[`filter__multiselect`])}>
          <MultiSelect data={recipesTags} name="tags"></MultiSelect>
        </div>
      )}
    </div>
  );
}

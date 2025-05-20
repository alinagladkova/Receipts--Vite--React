import cn from "classnames";
import styles from "./filter.module.scss";
import { useEffect, useState } from "react";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import { IconContext } from "react-icons";
import Button from "../Button/Button";
import Form from "../Form/Form";
import FilterSelect from "../FilterSelect/FilterSelect";
import FilterSlider from "../FilterSlider/FilterSlider";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function Filter({ tags, ingredients, difficulty, mealType, cuisine, calories, time, handleSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({});

  const handleGetSelected = (selected) => {
    // console.log(selected);
    // handleSelected(selected);
  };

  //обработка ошибок. Проверять типы.

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.code === "Escape") {
        setIsOpen(false); // обработчик клика на Esc
      }
    };
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);
  //закрытие на клик вне фильтра

  return (
    <div className={cn(styles.filter)}>
      <Button use="stealth" handler={() => setIsOpen((prev) => !prev)}>
        <IconContext.Provider value={{ color: "rgb(67, 69, 83)" }}>{isOpen ? <VscFilterFilled /> : <VscFilter />}</IconContext.Provider>
      </Button>
      {isOpen && (
        <div className={cn(styles[`filter__form`])}>
          <Form preventDefault={true} method="POST" action="#" handleGetSelected={handleGetSelected}>
            <FilterSelect data={tags} title="Tags" multi={true} handleSelect={handleGetSelected} />
            <FilterSelect data={ingredients} title="Ingridients" multi={true} handleSelect={handleGetSelected} />
            <FilterSelect data={mealType} title="Meal type" multi={false} handleSelect={handleGetSelected} />
            <FilterSelect data={cuisine} title="Cuisine" multi={false} handleSelect={handleGetSelected} />
            <FilterSlider title="Cooking Time (mins)" min={time.min} max={time.max} step="1" handleRange={handleGetSelected} />
            <FilterSlider title="Calories" min={calories.min} max={calories.max} step="10" handleRange={handleGetSelected} />
            <FilterCheckbox data={difficulty} title="Difficulty" handleCheckbox={handleGetSelected} />
          </Form>
        </div>
      )}
    </div>
  );
}

//компонент фильтра сгенерирует это:
// input => form => filter
// filter передает данные выше в app в состояние

// const filterParams = {
//     marka: "Lada",
//     coleso: {
//       min: 14,
//       max: 16
//     },
//     engeen: {
//       min: 1.4,
//       max: 2
//     },
//     colors: ['black', 'white']
//   };

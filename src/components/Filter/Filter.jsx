import cn from "classnames";
import styles from "./filter.module.scss";
import { useState } from "react";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import { IconContext } from "react-icons";
import Button from "../Button/Button";
import Form from "../Form/Form";
import FilterSelect from "../FilterSelect/FilterSelect";
import FilterSlider from "../FilterSlider/FilterSlider";
// import FilterSlider from "../FilterSlider/FilterSlider";

export default function Filter({ tags, ingredients, difficulty, mealType, cuisine, handleSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleGetSelected = (selected) => {
    handleSelected(selected);
  };

  //обработка ошибок. Проверять типы.
  return (
    <div className={cn(styles.filter)}>
      <Button use="stealth" handler={() => setIsOpen((prev) => !prev)}>
        <IconContext.Provider value={{ color: "rgb(67, 69, 83)" }}>{isOpen ? <VscFilterFilled /> : <VscFilter />}</IconContext.Provider>
      </Button>
      {isOpen && (
        <div className={cn(styles[`filter__form`])}>
          <Form preventDefault={true} method="POST" action="#" handleGetSelected={handleGetSelected}>
            <FilterSelect data={tags} title="Tags" multi={true} handleSelect={handleGetSelected} />
            <FilterSelect data={difficulty} title="Difficulty" multi={false} handleSelect={handleGetSelected} />
            <FilterSelect data={ingredients} title="Ingridients" multi={true} handleSelect={handleGetSelected} />
            <FilterSelect data={mealType} title="Meal type" multi={false} handleSelect={handleGetSelected} />
            <FilterSelect data={cuisine} title="Cuisine" multi={false} handleSelect={handleGetSelected} />
            <FilterSlider title="Rating" />
          </Form>
        </div>
      )}
    </div>
  );
}

// фильтр:
// по ингридиентам +
// по сложности select +
// по рейтингу slider
// время готовки slider
// калории slider
// mealType select +
// кухня select +

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

// _getFilterValue(filterParams) {
//   return (product) => {
//     return Object.keys(filterParams).every((key) => {
//       const currentProperty = product.properties.find((property) => property.key === key);
//       return (
//         filterParams[key] === currentProperty.value ||
//         (typeof filterParams[key] === "object" && filterParams[key].min <= currentProperty.value && filterParams[key].max >= currentProperty.value) ||
//         (Array.isArray(filterParams[key]) && filterParams[key].includes(currentProperty.value))
//       );
//     });
//   };
// }

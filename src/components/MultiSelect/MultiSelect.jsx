import cn from "classnames";
import styles from "./multiSelect.module.scss";
import Input from "../Input/Input";
import { IoMdClose } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

//реализовать функционал фильтра (контекст??)
//пусть запоминает выбранные тэги при закрытии поля ввода

export default function MultiSelect({ data, name }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isShown, setIsShown] = useState(false);

  //выбираем опцию(tag) из списка и добавляем в поле
  const handleSelectTag = (tag) => {
    const checkTagAdded = selectedOptions.find((option) => option === tag);
    if (!checkTagAdded) {
      const addedTags = data.filter((option) => option === tag);
      setSelectedOptions((prev) => [...prev, ...addedTags]);
    }
  };

  //на крестик убираем опции из поля
  const handleRemoveTag = (tag) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== tag));
  };

  //обработчик клика на Esc
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.code === "Escape") {
        setIsShown(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isShown]);

  return (
    <div className={cn(styles[`multi-select`])}>
      <h6 className={cn(styles[`multi-select__label`])}>Tags</h6>
      <div className={cn(styles[`multi-select__inner`])}>
        <div className={cn(styles[`multi-select__field`])}>
          <Input type="text" placeholder="" name="tags" hidden={true} />
          <div className={cn(styles[`multi-select__selected-options`])}>
            {selectedOptions.map((tag, i) => (
              <span key={i} className={cn(styles[`multi-select__tag`])}>
                {tag}
                {selectedOptions.length > 1 && (
                  <div className={cn(styles[`multi-select__tag-remove`])}>
                    <Button use="stealth" handler={() => handleRemoveTag(tag)}>
                      <IoMdClose />
                    </Button>
                  </div>
                )}
              </span>
            ))}
          </div>
          <div className={cn(styles[`multi-select__selected-control`])}>
            <Button
              use="showOptions"
              handler={() => {
                setIsShown((prev) => !prev);
              }}
            >
              {isShown ? <BsChevronUp /> : <BsChevronDown />}
            </Button>
          </div>
        </div>
        {isShown && (
          <div className={cn(styles[`multi-select__options-list`])}>
            {data.map((tag) => (
              <div className={cn(styles[`multi-select__option`])} key={tag} onClick={() => handleSelectTag(tag)}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

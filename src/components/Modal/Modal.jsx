import cn from "classnames";
import styles from "./modal.module.scss";
import Button from "../Button/Button";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

export default function Modal({ children, isActive, handleClose }) {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.code === "Escape") {
        handleClose(); // обработчик клика на Esc
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    if (isActive) {
      document.body.classList.add("fixed-position");
    }

    return () => {
      document.body.classList.remove("fixed-position");
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isActive]);

  const handleCloseOuterClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose(); // Закрываем модальное окно, если кликнули вне обёртки
    }
  };

  return (
    isActive && (
      <div className={cn(styles.modal)} onClick={handleCloseOuterClick}>
        <div className={cn(styles[`modal__wrapper`])}>
          <div className={cn(styles[`modal__close`])}>
            <Button use="stealth" handler={handleClose}>
              <IoMdClose />
            </Button>
          </div>
          <div className={cn(styles[`modal__content`])}>{children}</div>
        </div>
      </div>
    )
  );
}

// открытие при клике на изображение +
// overflow: hidden; для body, когда модальное окно открывается
// картинка рецепта +
// закрытие на esc и клик вне модалки +
// закрытие на крестик +

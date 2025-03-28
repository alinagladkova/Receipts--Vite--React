import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useState } from "react";
import Button from "../Button/Button";

export default function RecipesList({ recipes }) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContent, setIsActiveContent] = useState(null);

  const handleOpenActiveModal = (image) => {
    setIsActiveModal(true);
    setIsActiveContent(image);
  };

  const handleClose = () => {
    setIsActiveModal(false);
  };

  return (
    <div className={cn(styles[`recipes-list`])}>
      <div className={cn(styles[`recipes-list__wrapper`])}>
        {recipes &&
          recipes.map((recipe) => (
            <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
              <Recipe recipe={recipe} handle={handleOpenActiveModal} />
            </div>
          ))}
      </div>
      <div className={cn(styles[`recipes-list__btn`])}>
        <Button use="loadMore">Load more</Button>
      </div>
      {createPortal(
        <Modal isActive={isActiveModal} handleClose={handleClose}>
          <img src={isActiveContent} />
        </Modal>,
        document.body
      )}
    </div>
  );
}

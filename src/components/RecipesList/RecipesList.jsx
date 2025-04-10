import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useState } from "react";
import Button from "../Button/Button";
import Skeleton from "../Skeleton/Skeleton";
import Loader from "../Loader/Loader";

export default function RecipesList({ recipes, recipesMaxRef, handleSetSkip, isLoading }) {
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
        {isLoading
          ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
          : recipes.map((recipe) => (
              <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
                <Recipe recipe={recipe} handleOpenActiveModal={handleOpenActiveModal} />
              </div>
            ))}
      </div>
      {recipes.length < recipesMaxRef.current && (
        <div className={cn(styles[`recipes-list__btn`])}>
          <Button use="loadMore" handler={handleSetSkip}>
            Load more ({recipes.length}){isLoading && <Loader />}
          </Button>
        </div>
      )}
      {createPortal(
        <Modal isActive={isActiveModal} handleClose={handleClose}>
          <img src={isActiveContent} />
        </Modal>,
        document.body
      )}
    </div>
  );
}

/* 

на каждом рецепте сверху справа будет кнопка звездочка
кликаем на звездочка и она красится +

написать компонент лист избранного +

написат ькомпонент (овал) Classic Margherita Pizza X Classic Margherita Pizza X Classic Margherita Pizza X

перенести useEffect выше

*/

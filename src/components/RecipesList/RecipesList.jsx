import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useState } from "react";
import Button from "../Button/Button";
import Skeleton from "../Skeleton/Skeleton";
import Loader from "../Loader/Loader";

export default function RecipesList({ recipes, favoriteRecipes, handleSetSkip, isLoading, handleToFavorite, hasMore }) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContent, setIsActiveContent] = useState(null);

  const handleOpenActiveModal = (image) => {
    setIsActiveModal(true);
    setIsActiveContent(image);
  };

  const handleClose = () => {
    setIsActiveModal(false);
  };

  const isFavoriteRecipe = (recipe) => {
    return favoriteRecipes.includes(recipe);
  };

  return (
    <div className={cn(styles[`recipes-list`])}>
      <div className={cn(styles[`recipes-list__wrapper`])}>
        {recipes.map((recipe) => (
          <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
            <Recipe recipe={recipe} handleOpenActiveModal={handleOpenActiveModal} handleToFavorite={handleToFavorite} isFavorite={isFavoriteRecipe(recipe)} />
          </div>
        ))}
        {isLoading && [...new Array(10)].map((_, i) => <Skeleton key={i} />)}
      </div>
      {hasMore && (
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

import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useState } from "react";
import Button from "../Button/Button";
import Skeleton from "../Skeleton/Skeleton";
import Loader from "../Loader/Loader";

export default function RecipesList({ recipes, filteredRecipes, favoriteRecipes, handleSetSkip, isLoading, handleToFavorite, hasMore }) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContent, setIsActiveContent] = useState(null);
  // console.log(filteredRecipes); //не обновляется рендер, когда приходит новый filteredRecipes

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
        {filteredRecipes === null ? (
          recipes.map((recipe) => (
            <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
              <Recipe recipe={recipe} handleOpenActiveModal={handleOpenActiveModal} handleToFavorite={handleToFavorite} isFavorite={isFavoriteRecipe(recipe)} />
            </div>
          ))
        ) : !filteredRecipes.length === 0 ? (
          filteredRecipes.map((recipe) => (
            <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
              <Recipe recipe={recipe} handleOpenActiveModal={handleOpenActiveModal} handleToFavorite={handleToFavorite} isFavorite={isFavoriteRecipe(recipe)} />
            </div>
          ))
        ) : (
          <span className={cn(styles[`recipes-list__error`])}>There is no recipe with such tags.</span>
        )}
        {isLoading && [...new Array(10)].map((_, i) => <Skeleton key={i} />)}
      </div>
      {hasMore && (
        <div className={cn(styles[`recipes-list__btn`])}>
          <Button use="primary" handler={handleSetSkip}>
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

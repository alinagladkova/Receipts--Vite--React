import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

export default function RecipesList({}) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContent, setIsActiveContent] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);

  const handleOpenActiveModal = (image) => {
    setIsActiveModal(true);
    setIsActiveContent(image);
  };

  const handleClose = () => {
    setIsActiveModal(false);
  };

  const handleSetSkip = () => {
    setSkip(skip + 8);
    console.log("yes");
  };

  /* 
  
  1 сделать так чтобы при достижении финиша данных, handleSetSkip больше не вызывался
  2 сделать подгрузку компонента рецепт на скелетоне (8 штук)
  3 сделать скелетоны в момент загрузки "загрузить еще" -> написать лоадер(крутилку) и внедрить в кнопку
  
  */

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes?limit=8&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes([...recipes, ...data.recipes]);
      });
  }, [skip]);

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
        <Button use="loadMore" handler={handleSetSkip}>
          Load more ({recipes.length})
        </Button>
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

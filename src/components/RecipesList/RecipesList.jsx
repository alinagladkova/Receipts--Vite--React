import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Skeleton from "../Skeleton/Skeleton";

export default function RecipesList({}) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContent, setIsActiveContent] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [recipesMax, setRecipesMax] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true); //
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenActiveModal = (image) => {
    setIsActiveModal(true);
    setIsActiveContent(image);
  };

  const handleClose = () => {
    setIsActiveModal(false);
  };

  const handleSetSkip = () => {
    if (recipes.length === recipesMax) {
      return;
    }
    setSkip(skip + 8);
  };

  /* 
  
  1 сделать так чтобы при достижении финиша данных, handleSetSkip больше не вызывался + 
  2 сделать подгрузку компонента рецепт на скелетоне (8 штук) +
  3 сделать скелетоны в момент загрузки "загрузить еще" -> написать лоадер(крутилку) и внедрить в кнопку +

Проблемы
	ошибка keys при сохранении изменений в файле: 2 пары последних рецептов отрисовываются при каждом рендере
  */

  useEffect(() => {
    setIsLoading(true); // начало загрузки
    fetch(`https://dummyjson.com/recipes?limit=8&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        if (isFirstLoad) {
          setRecipesMax(data.total);
          setIsFirstLoad(false);
        }
        setRecipes([...recipes, ...data.recipes]);
      })
      .finally(() => {
        setIsLoading(false); // конец загрузки
      });
  }, [skip]);

  return (
    <div className={cn(styles[`recipes-list`])}>
      <div className={cn(styles[`recipes-list__wrapper`])}>
        {isLoading
          ? [...new Array(skip)].map((_, i) => <Skeleton key={i} />)
          : recipes.map((recipe) => (
              <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
                <Recipe recipe={recipe} handle={handleOpenActiveModal} />
              </div>
            ))}
      </div>
      {recipes.length !== recipesMax && (
        <div className={cn(styles[`recipes-list__btn`])}>
          <Button use="loadMore" handler={handleSetSkip}>
            Load more ({recipes.length}){isLoading && <span className={cn(styles[`recipes-list__spinner`])}></span>}
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

import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Skeleton from "../Skeleton/Skeleton";
import Loader from "../Loader/Loader";

export default function RecipesList({}) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveContent, setIsActiveContent] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const recipesMaxRef = useRef(0);

  const handleOpenActiveModal = (image) => {
    setIsActiveModal(true);
    setIsActiveContent(image);
  };

  const handleClose = () => {
    setIsActiveModal(false);
  };

  const handleSetSkip = () => {
    // console.log("yes", recipes.length, recipesMaxRef.current);
    if (recipes.length === recipesMaxRef.current) {
      return;
    }
    // if (recipes.length >= recipesMaxRef.current) {
    //   return;
    // }
    // const rest = recipesMaxRef.current - recipes.length;
    // console.log(skip, rest);
    // if (rest >= 8) {
    //   setSkip(skip + 8);
    // } else {
    //   // console.log(skip + rest);
    //   setSkip(skip + rest);
    // }
    setSkip(skip + 10);
  };

  useEffect(() => {
    setIsLoading(true); // начало загрузки
    fetch(`https://dummyjson.com/recipes?limit=10&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        recipesMaxRef.current = data.total;

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
          ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
          : recipes.map((recipe) => (
              <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
                <Recipe recipe={recipe} handle={handleOpenActiveModal} />
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

на каждом рецепте сверху справа будет кнпка звездочка
кликаем на звездочка и она красится

написат ькомпонент лист избранного

написат ькомпонент (овал) Classic Margherita Pizza X Classic Margherita Pizza X Classic Margherita Pizza X

перенести useEffect выше

*/

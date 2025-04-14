import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const recipesMaxRef = useRef(0);

  const handleSetSkip = () => {
    if (recipes.length === recipesMaxRef.current) {
      return;
    }
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

  const handleToFavorite = (recipe) => {
    !favoriteRecipes.includes(recipe)
      ? setFavoriteRecipes((prev) => [...prev, recipe])
      : setFavoriteRecipes((prev) => [...prev].filter((value) => value !== recipe));
  };

  return (
    <>
      <Header />
      <div className="container">
        <FavoriteList favoriteList={favoriteRecipes} />
        <RecipesList recipes={recipes} recipesMaxRef={recipesMaxRef} handleSetSkip={handleSetSkip} isLoading={isLoading} handleToFavorite={handleToFavorite} />
      </div>
    </>
  );
}

/* 

написат ькомпонент (овал) Classic Margherita Pizza X Classic Margherita Pizza X Classic Margherita Pizza X

адаптив

*/

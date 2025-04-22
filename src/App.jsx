import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const recipesMaxRef = useRef(0);

  const handleSetSkip = () => {
    if (!hasMore || isLoading) return;
    setSkip((prev) => prev + 8);
  };

  const fetchRecipes = async () => {
    if (!hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/recipes?limit=8&skip=${skip}`);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      recipesMaxRef.current = data.total;
      setRecipes([...recipes, ...data.recipes]);
      setHasMore(skip + data.recipes.length < data.total);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false); // конец загрузки
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [skip]);

  const handleToFavorite = (id) => {
    const findedRecipe = recipes.find((recipe) => recipe.id === id);

    if (!findedRecipe) {
      throw new Error(`Recipe with id: ${id} is not found!`);
    }

    !favoriteRecipes.includes(findedRecipe)
      ? setFavoriteRecipes((prev) => [...prev, findedRecipe])
      : setFavoriteRecipes((prev) => prev.filter((recipe) => recipe !== findedRecipe));
  };

  return (
    <>
      <Header />
      <div className="container">
        <FavoriteList favoriteRecipes={favoriteRecipes} handleToFavorite={handleToFavorite} />
        <RecipesList
          recipes={recipes}
          favoriteRecipes={favoriteRecipes}
          handleSetSkip={handleSetSkip}
          isLoading={isLoading}
          handleToFavorite={handleToFavorite}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}

/* 

адаптив
сделать прогрузку изображения (можно ли передать состояние isLoading ниже или нужно новое?)
сделать фильтр по тэгам
отображение ошибок
ошибка ключа
 
*/

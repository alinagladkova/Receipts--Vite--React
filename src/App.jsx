import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import { useEffect, useRef, useState } from "react";
import Filter from "./components/Filter/Filter";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const [recipesTags, setRecipesTags] = useState([]);
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

      // setRecipesTags((prev) => {
      //   recipes.reduce((acc, recipe) => {
      //     return [...acc, ...recipe.tags];
      //   }, "");
      //   const tags = recipesTags.filter((tag, i, arr) => arr.indexOf(tag) === i);
      //   return tags;
      // });
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

  const getRecipesTags = () => {
    if (recipes.length > 0) {
      const recipesTags = recipes.reduce((acc, recipe) => {
        return [...acc, ...recipe.tags];
      }, "");
      const tags = recipesTags.filter((tag, i, arr) => arr.indexOf(tag) === i);
      return tags;
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <BreadCrumbs>
          <FavoriteList favoriteRecipes={favoriteRecipes} handleToFavorite={handleToFavorite} />
          <Filter recipesTags={getRecipesTags()} />
        </BreadCrumbs>
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
доделать фильтр по тэгам
отображение ошибок
самые просматриваемые
поиск
hoverы
breadcrumbs открывать поочередно, а не все сразу
*/

/* ошибка ключа
1. Add an isInitialMount ref to prevent initial fetch:
const isInitialMount = useRef(true);

2. Modify the useEffect to skip initial mount:
useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return;
  }
  fetchRecipes();
}, [skip]);

3. Update the setRecipes logic to check for duplicates:
setRecipes(prevRecipes => {
  const newRecipes = data.recipes.filter(newRecipe => 
    !prevRecipes.some(existingRecipe => existingRecipe.id === newRecipe.id)
  );
  return [...prevRecipes, ...newRecipes];
});


*/

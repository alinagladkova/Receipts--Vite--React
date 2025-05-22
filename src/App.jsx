import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import { useEffect, useRef, useState } from "react";
import Filter from "./components/Filter/Filter";
import { useMemo } from "react";
import RecipesProperties from "./utils/RecipesProperties";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const recipesMaxRef = useRef(0);

  const handleSetSkip = () => {
    if (!hasMore || isLoading) return;
    setSkip((prev) => prev + 8);
  };

  const handleCloseFilter = () => {
    setIsActiveFilter(false);
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

  const memoRecipesTags = useMemo(() => RecipesProperties.getProperties(recipes, "tags"), [recipes]);

  const memoRecipesIngredients = useMemo(() => RecipesProperties.getProperties(recipes, "ingredients"), [recipes]);

  const memoRecipesMealType = useMemo(() => RecipesProperties.getProperties(recipes, "mealType"), [recipes]);

  const memoRecipesCuisine = useMemo(() => RecipesProperties.getProperties(recipes, "cuisine"), [recipes]);

  const memoRecipesTimeRange = useMemo(() => RecipesProperties.getProperties(recipes, "cookTimeMinutes"), [recipes]);

  const memoRecipesCaloriesRange = useMemo(() => RecipesProperties.getProperties(recipes, "caloriesPerServing"), [recipes]);

  const memoRecipesDifficulty = useMemo(() => RecipesProperties.getProperties(recipes, "difficulty"), [recipes]);

  const getFilterValue = (filterParams) => {
    console.log(filterParams);

    // setFilteredRecipes();
    // return (recipe) => {
    //   return Object.keys(filterParams).every((key) => {
    //     const currentProperty = product.properties.find((property) => property.key === key);
    //     return (
    //       filterParams[key] === currentProperty.value ||
    //       (typeof filterParams[key] === "object" && filterParams[key].min <= currentProperty.value && filterParams[key].max >= currentProperty.value) ||
    //       (Array.isArray(filterParams[key]) && filterParams[key].includes(currentProperty.value))
    //     );
    //   });
    // };
    //сюда должен прийти объект filterParams
    // закинуть в состояние
    // if (selected.length === 0) {
    //   return;
    // }
    // const selectedItems = selected.map((item) => item.value);
    // console.log(selectedItems);
    // const filtered = recipes.filter((recipe) => {
    //   return selectedItems.every((item) => recipe.tags.includes(item));
    // });
    // setFilteredRecipes(filtered);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="control-panel">
          <FavoriteList favoriteRecipes={favoriteRecipes} handleToFavorite={handleToFavorite} />
          <Filter
            tags={memoRecipesTags}
            ingredients={memoRecipesIngredients}
            difficulty={memoRecipesDifficulty}
            mealType={memoRecipesMealType}
            cuisine={memoRecipesCuisine}
            calories={memoRecipesCaloriesRange}
            time={memoRecipesTimeRange}
            handleClose={handleCloseFilter}
            handleSelected={getFilterValue}
          />
          {/* {console.log(isActiveFilter)} */}
        </div>
        <RecipesList
          recipes={recipes}
          filteredRecipes={filteredRecipes}
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
отображение ошибок
самые просматриваемые
поиск
control-panel открывать поочередно, а не все сразу
добавить транзишены

хэндлером из формы получить данные и отфильтровать
вспомнить класс FormData
закрытие фильтра на клик вне
сделать сортировку
в фильтре кнопка очистить все
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

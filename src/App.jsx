import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import { useEffect, useRef, useState } from "react";
import Filter from "./components/Filter/Filter";
import Button from "./components/Button/Button";
import { useMemo } from "react";
// import { getRecipesTags } from "./utils/selectorData";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
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

  const getRecipesData = (data) => {
    if (recipes.length < 0) {
      return;
    }
    const recipesData = data
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .map((el, i, arr) => {
        return typeof el === "number" ? { min: Math.min(...arr), max: Math.max(...arr) } : { value: el, label: el };
      });

    return recipesData;
  };

  const getRecipesTags = () => {
    console.log("getRecipesTags");
    const recipesTags = recipes.reduce((acc, recipe) => {
      return [...acc, ...recipe.tags];
    }, []);

    const tags = getRecipesData(recipesTags);
    return tags;
  };

  const memoRecipesTags = useMemo(() => getRecipesTags(), [recipes]);

  const getRecipesIngredients = () => {
    const recipesIngredients = recipes.reduce((acc, recipe) => {
      return [...acc, ...recipe.ingredients];
    }, []);

    const ingredients = getRecipesData(recipesIngredients);
    return ingredients;
  };

  const memoRecipesIngredients = useMemo(() => getRecipesIngredients(), [recipes]);

  const getRecipesMealType = () => {
    const recipesMealType = recipes.reduce((acc, recipe) => {
      return [...acc, ...recipe.mealType];
    }, []);

    const mealType = getRecipesData(recipesMealType);
    return mealType;
  };

  const memoRecipesMealType = useMemo(() => getRecipesMealType(), [recipes]);

  const getRecipesCuisine = () => {
    const recipesCuisine = recipes.map((recipe) => recipe.cuisine);

    const cuisine = getRecipesData(recipesCuisine);
    return cuisine;
  };

  const memoRecipesCuisine = useMemo(() => getRecipesCuisine(), [recipes]);

  const getCookingTimeRange = () => {
    const recipesTime = recipes.map((recipe) => recipe.cookTimeMinutes);
    const time = getRecipesData(recipesTime);

    return time.reduce((acc, el) => {
      return el;
    }, time[0]);
  };

  const memoRecipesTimeRange = useMemo(() => getCookingTimeRange(), [recipes]);

  const getCaloriesRange = () => {
    const recipesCalories = recipes.map((recipe) => recipe.caloriesPerServing);
    const calories = getRecipesData(recipesCalories);

    return calories.reduce((acc, el) => {
      return el;
    }, calories[0]);
  };

  const memoRecipesCaloriesRange = useMemo(() => getCaloriesRange(), [recipes]);

  const getRecipesDifficulty = () => {
    const recipesDifficulty = recipes.map((recipe) => recipe.difficulty);

    const difficulty = getRecipesData(recipesDifficulty);
    return difficulty;
  };

  const memoRecipesDifficulty = useMemo(() => getRecipesDifficulty(), [recipes]);

  const handleSelected = (selected) => {
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
            handleSelected={handleSelected}
          />
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
добавить тормоз на фильтр и кнопку отфильтровать 
сделать сортировку
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

//поменять reduce на map +
// дополнить фильтр

// if (recipes.length > 0) {
//   const recipesTags = recipes
//     .reduce((acc, recipe) => {
//       return [...acc, ...recipe.tags];
//     }, [])
//     .filter((tag, i, arr) => arr.indexOf(tag) === i)
//     .map((tag) => {
//       return { value: tag, label: tag };
//     });
//   // .reduce((acc, tag) => {
//   //   acc.push({ value: tag, label: tag });
//   //   return acc;
//   // }, []);
//   // const tags = recipesTags.filter((tag, i, arr) => arr.indexOf(tag) === i);
//   // return tags;
//   return recipesTags;
// }

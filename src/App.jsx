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
    // if (recipes.length === recipesMaxRef.current) {
    //   return;
    // }
    if (!hasMore || isLoading) return;
    setSkip((prev) => prev + 8);
  };

  useEffect(() => {
    // setIsLoading(true); // начало загрузки
    // fetch(`https://dummyjson.com/recipes?limit=8&skip=${skip}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     recipesMaxRef.current = data.total;
    //     setRecipes([...recipes, ...data.recipes]);
    //   })
    //   .finally(() => {
    //     setIsLoading(false); // конец загрузки
    //   });
    const fetchResipes = async () => {
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
    fetchResipes();
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
        <RecipesList recipes={recipes} handleSetSkip={handleSetSkip} isLoading={isLoading} handleToFavorite={handleToFavorite} hasMore={hasMore} />
      </div>
    </>
  );
}

/* 

адаптив
сделать прогрузку изображения (можно ли передать состояние isLoading ниже или нужно новое?)
сделать фильтр по тэгам
отображение ошибок
исправить ошибку ключа +
доделать удаление в списке:
 - прокинуть хэндлер из app в favoriteList и открывать/закрывать через него или как-то иначе
*/

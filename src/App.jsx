import { useEffect, useState } from "react";
import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";

export default function App() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  return (
    <>
      <Header />
      <RecipesList recipes={recipes} />
    </>
  );
}

// отверстать
// усложнить?
// компонент tabs
// разобраться с лого

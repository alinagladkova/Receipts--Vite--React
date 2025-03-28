import { useEffect, useState } from "react";
import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";

export default function App() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=8")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <RecipesList recipes={recipes} />
      </div>
    </>
  );
}

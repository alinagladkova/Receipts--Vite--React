import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";
import FavoriteList from "./components/FavoriteList/FavoriteList";

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <FavoriteList />
        <RecipesList />
      </div>
    </>
  );
}

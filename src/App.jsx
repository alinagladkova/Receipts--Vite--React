import RecipesList from "./components/RecipesList/RecipesList";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <RecipesList />
      </div>
    </>
  );
}

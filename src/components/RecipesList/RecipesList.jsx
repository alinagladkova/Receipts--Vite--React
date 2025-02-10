import Recipe from "../Recipe/Recipe";
import cn from "classnames";
import styles from "./recipesList.module.scss";

export default function RecipesList({ recipes }) {
  return (
    <div className={cn(styles[`recipes-list`])}>
      {recipes &&
        recipes.map((recipe) => (
          <div className={cn(styles[`recipes-list__recipe`])} key={recipe.id}>
            <Recipe recipe={recipe} />
          </div>
        ))}
    </div>
  );
}

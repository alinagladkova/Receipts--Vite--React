// const getRecipesTags = (recipes) => {
//   if (recipes.length > 0) {
//     const recipesTags = recipes
//       .reduce((acc, recipe) => {
//         return [...acc, ...recipe.tags];
//       }, [])
//       .filter((tag, i, arr) => arr.indexOf(tag) === i)
//       .map((tag) => {
//         console.log(tag);
//         return { value: tag, label: tag };
//       });

//     return recipesTags;
//   }
// };

// export { getRecipesTags };

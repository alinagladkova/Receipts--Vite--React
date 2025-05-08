export const transformTagsToOptions = (tags) => {
  return tags.reduce((acc, tag) => {
    acc.push({ value: tag, label: tag });
    return acc;
  }, []);
};

export const findCommonElements = (arr1, arr2) => {
  return arr1.filter((element) => arr2.includes(element));
};

export const filterRecipesByTags = (recipes, favoriteTags) => {
  return recipes.filter((recipe) => {
    // Check if recipe has ALL the favorite tags
    return favoriteTags.every((tag) => recipe.tags.includes(tag));
  });
};

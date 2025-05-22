export default class RecipesProperties {
  //создаем массив значений
  static getProperties(recipes, type) {
    //проверка на наличие рецептов
    if (!recipes[0]) {
      return [];
    }
    const recipesProps = Array.isArray(recipes[0][type])
      ? recipes.reduce((acc, recipe) => {
          return [...acc, ...recipe[type]];
        }, [])
      : recipes.map((recipe) => recipe[type]);

    return RecipesProperties.#_convertRecipesProps(recipesProps);
  }

  //фильтруем и переделываем в массив объектов, нужный для фильтра
  static #_convertRecipesProps(props) {
    return props
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .map((el, i, arr) => {
        return typeof el === "number" ? { min: Math.min(...arr), max: Math.max(...arr) } : { value: el, label: el };
      });
  }
}

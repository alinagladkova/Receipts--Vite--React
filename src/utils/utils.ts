export const transformTagsToOptions = (tags) => {
  return tags.reduce((acc, tag) => {
    acc.push({ value: tag, label: tag });
    return acc;
  }, []);
};

const findTags = (data, tag) => {
  const d = data.filter(el => el.tag === tag);

  if (d.length > 0) {
    return d.map(el => {
      const result = {};
      if (el.data) result.data = el.data;
      if (el.tree && el.tree.length > 0) result.tree = el.tree;
      return result;
    });
  }
  return [];
};

export default findTags;

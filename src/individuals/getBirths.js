// @flow
import findTags from "../helpers/findTags";

import type { Seed } from "../types/seeds";
import type { Births } from "../types/individuals";

const getBirths = (individual: Seed): Births => {
  const tags = findTags(individual.tree, "BIRT");

  if (!tags || !tags.length === 0) {
    return [];
  }

  return tags.map((tag: Seed) => {
    const place = findTags(tag.tree, "PLAC");
    const date = findTags(tag.tree, "DATE");

    const result = {};

    if (place.length && place[0] && place[0].data) {
      result.place = {};
      result.place.name = place[0] && place[0].data;
    }
    if (date.length && date[0] && date[0].data) {
      result.date = date[0].data;
    }

    return result;
  });
};

export default getBirths;

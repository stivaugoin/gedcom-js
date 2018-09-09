// @flow
import findTags from "../helpers/findTags";

import type { Seed } from "../types/seeds";
import type { Deaths } from "../types/individuals";
import type { Places } from "../types/places";

const getDeaths = ({
  individual,
  places
}: {
  individual: Seed,
  places: Places
}): Deaths => {
  const tags = findTags(individual.tree, "DEAT");

  if (!tags || !tags.length === 0) {
    return [];
  }

  return tags.map((tag: Seed) => {
    const placeTag = findTags(tag.tree, "PLAC");
    const dateTag = findTags(tag.tree, "DATE");

    const result = {};

    if (placeTag.length && placeTag[0] && placeTag[0].data) {
      const name = placeTag[0] && placeTag[0].data;
      if (name) {
        if (!places || places.length === 0) {
          result.place = {
            name
          };
        } else {
          const place = places.find(p => p.name === name);

          if (place) {
            result.place = {
              id: place.id,
              name
            };
          } else {
            result.place = {
              name
            };
          }
        }
      }
    }
    if (dateTag.length && dateTag[0] && dateTag[0].data) {
      result.date = dateTag[0].data;
    }

    return result;
  });
};

export default getDeaths;

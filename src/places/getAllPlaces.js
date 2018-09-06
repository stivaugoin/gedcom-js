// @flow
import type { Places } from "../types/places";
import type { Seed, Seeds } from "../types/seeds";

import findTags from "../helpers/findTags";

export default (seeds: Seeds): Places => {
  const placesMap = new Map();

  function getTree(data: Seeds) {
    data.forEach((d: Seed) => {
      const place = findTags(data, "PLAC");
      if (place && place.length > 0) {
        const name = place[0].data;
        if (placesMap.get(name)) {
          placesMap.set(name, placesMap.get(name) + 1);
        } else {
          placesMap.set(name, 1);
        }
      } else if (d.tree && d.tree.length > 0) {
        getTree(d.tree);
      }
    });
  }

  seeds.forEach((seed: Seed) => {
    getTree(seed.tree);
  });

  const uniquePlace = [];
  let i = 1;

  placesMap.forEach((value, key) => {
    uniquePlace.push({ id: `P${i}`, name: key, count: value });
    i += 1;
  });

  return uniquePlace;
};

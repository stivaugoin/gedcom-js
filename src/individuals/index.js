// @flow
import getBirths from "./getBirths";
import getChildren from "./getChildren";
import getDeaths from "./getDeaths";
import getGender from "./getGender";
import getId from "../helpers/getId";
import getNames from "./getNames";
import getParents from "./getParents";
import getWeddings from "./getWeddings";

import type { Individuals } from "../types/individuals";
import type { Places } from "../types/places";

import type { Seed, Seeds } from "../types/seeds";

/**
 * Convert raw data into a structured and denormalized object
 *
 * Available in v0.2
 *  - id
 *  - births
 *  - deaths
 *  - gender
 *  - names
 *  - children
 *  - parents
 */

export default ({
  families,
  individuals,
  places
}: {
  families: Seeds,
  individuals: Seeds,
  places: Places
}): Individuals => {
  if (!individuals || individuals.length === 0) {
    throw new Error("individuals is missing or empty");
  }

  return individuals.map((individual: Seed) => {
    const result: Object = {
      id: getId(individual, "I"),
      births: getBirths({ individual, places }),
      deaths: getDeaths({ individual, places }),
      gender: getGender(individual),
      names: getNames(individual)
    };

    if (families && families.length > 0) {
      result.children = getChildren({ individual, individuals, families });
      result.parents = getParents({ individual, individuals, families });
      result.weddings = getWeddings({
        individual,
        individuals,
        families,
        places
      });
    }

    return result;
  });
};

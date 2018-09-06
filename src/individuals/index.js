// @flow
import getBirths from "./getBirths";
import getChildren from "./getChildren";
import getGender from "./getGender";
import getId from "../helpers/getId";
import getNames from "./getNames";
import getParents from "./getParents";

import type { Individuals } from "../types/individuals";
import type { Places } from "../types/places";

import type { Seed, Seeds } from "../types/seeds";

/**
 * Convert raw data into a structured and denormalized object
 *
 * Available in v0.1
 *  - id
 *  - names
 *  - gender
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
      gender: getGender(individual),
      names: getNames(individual),
      births: getBirths({ individual, places })
    };

    if (families && families.length > 0) {
      result.children = getChildren({ individual, individuals, families });
      result.parents = getParents({ individual, individuals, families });
    }

    return result;
  });
};

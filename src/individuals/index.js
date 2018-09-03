// @flow
import getChildren from "./getChildren";
import getGender from "./getGender";
import getId from "../helpers/getId";
import getNames from "./getNames";
import getParents from "./getParents";

import type { Individuals } from "../types/individuals";
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

export default (individuals: Seeds, families: Seeds): Individuals =>
  individuals.map((individual: Seed) => ({
    children: getChildren({ individual, individuals, families }),
    id: getId(individual, "I"),
    gender: getGender(individual),
    names: getNames(individual),
    parents: getParents({ individual, individuals, families })
  }));

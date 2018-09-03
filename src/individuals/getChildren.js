// @flow
import findTags from "../helpers/findTags";
import getNames from "./getNames";
import getId from "../helpers/getId";

import type { Children } from "../types/individuals";
import type { Seed, Seeds } from "../types/seeds";

/**
 * Get the family as spouse of the individual
 * find each children of this family
 * and return basic information (id, fname, lname)
 */
const getChildren = ({
  individual,
  individuals,
  families
}: {
  individual: Seed,
  individuals: Seeds,
  families: Seeds
}): Children => {
  if (!individual || Object.keys(individual).length === 0) {
    throw new Error("individual is missing or empty");
  }

  if (!individuals || individuals.length === 0) {
    throw new Error("individuals is missing or empty");
  }

  if (!families || families.length === 0) {
    throw new Error("families is missing or empty");
  }

  // Family as Spouse
  const fams = findTags(individual.tree, "FAMS");
  if (!fams || fams.length === 0 || !fams[0] || !fams[0].data) {
    // No family as spouse found
    return [];
  }

  return fams
    .map(familySpousePointer => {
      // Get family with the family pointer
      const familyPointer = familySpousePointer.data;
      const family = families.find(f => f.pointer === familyPointer);

      if (!family || !family.tree || family.tree.length === 0) {
        // No family found.
        // Is there a better way to handle this than returning an empty object?
        return {};
      }

      // Get children of the family
      const children = findTags(family.tree, "CHIL")
        .map(child => child.data)
        .map(pointer => {
          // Get information about this child
          const child = individuals.find(i => i.pointer === pointer);

          if (!child || Object.keys(child).length === 0) {
            return {};
          }

          const { fname, lname } = getNames(child)[0];
          const id = getId(child, "I");

          return {
            id,
            fname,
            lname
          };
        });

      return children;
    })
    .reduce((acc, val) => acc.concat(val), []);
};

export default getChildren;

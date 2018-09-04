// @flow
import findTags from "../helpers/findTags";
import getId from "../helpers/getId";
import getNames from "./getNames";

import type { Parents } from "../types/individuals";
import type { Seed, Seeds } from "../types/seeds";

const getParents = ({
  individual,
  individuals,
  families
}: {
  individual: Seed,
  individuals: Seeds,
  families: Seeds
}): Parents => {
  if (!individual || Object.keys(individual).length === 0) {
    throw new Error("individual is missing or empty");
  }

  if (!individuals || individuals.length === 0) {
    throw new Error("individuals is missing or empty");
  }

  if (!families || families.length === 0) {
    throw new Error("families is missing or empty");
  }

  // Family as Child
  const famc = findTags(individual.tree, "FAMC");
  if (!famc || famc.length === 0 || !famc[0] || !famc[0].data) {
    // No family as child found
    return [];
  }

  return (
    famc
      .map(familyChildPointer => {
        // Get family with the family pointer
        const familyPointer = familyChildPointer.data;
        const family = families.find(f => f.pointer === familyPointer);

        if (!family || !family.tree || family.tree.length === 0) {
          // No family found.
          // Is there a better way to handle this than returning an empty object?
          return {};
        }

        // Get father of the child
        const husband = findTags(family.tree, "HUSB")
          .map(father => father.data)
          .map(pointer => {
            // Get information about this father
            const father = individuals.find(i => i.pointer === pointer);

            if (!father || Object.keys(father).length === 0) {
              return {};
            }

            const { fname, lname } = getNames(father)[0];
            const id = getId(father, "I");

            return {
              id,
              fname,
              lname,
              relation: "father"
            };
          });

        // Get mother of the child
        const wife = findTags(family.tree, "WIFE")
          .map(mother => mother.data)
          .map(pointer => {
            // Get information about this father
            const mother = individuals.find(i => i.pointer === pointer);

            if (!mother || Object.keys(mother).length === 0) {
              return {};
            }

            const { fname, lname } = getNames(mother)[0];
            const id = getId(mother, "I");

            return {
              id,
              fname,
              lname,
              relation: "mother"
            };
          });

        return [husband, wife];
      })
      // Too much level of array ¯\_(ツ)_/¯
      .reduce((acc, val) => acc.concat(val), [])
      .reduce((acc, val) => acc.concat(val), [])
  );
};

export default getParents;

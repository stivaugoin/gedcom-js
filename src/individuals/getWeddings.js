// @flow
import findTags from "../helpers/findTags";
import getId from "../helpers/getId";
import getNames from "./getNames";

import type { Parents } from "../types/individuals";
import type { Places } from "../types/places";
import type { Seed, Seeds } from "../types/seeds";

const getWeddings = ({
  individual,
  individuals,
  families,
  places
}: {
  individual: Seed,
  individuals: Seeds,
  families: Seeds,
  places: Places
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

  if (!places || places.length === 0) {
    throw new Error("places is missing or empty");
  }

  // Family as Spouse
  const fams = findTags(individual.tree, "FAMS");
  if (!fams || fams.length === 0 || !fams[0] || !fams[0].data) {
    // No family as spouse found
    return [];
  }

  const wedding = {};
  const currentIndividualPointer = individual.pointer;

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

      const marriage = findTags(family.tree, "MARR");
      if (!marriage || marriage.length === 0) {
        // No marriage found.
        // Is there a better way to handle this than returning an empty object?
        return {};
      }

      const placeTag = findTags(marriage[0].tree, "PLAC");
      const dateTag = findTags(marriage[0].tree, "DATE");

      if (placeTag.length && placeTag[0] && placeTag[0].data) {
        const name = placeTag[0] && placeTag[0].data;
        if (name) {
          if (!places || places.length === 0) {
            wedding.place = {
              name
            };
          } else {
            const place = places.find(p => p.name === name);

            if (place) {
              wedding.place = {
                id: place.id,
                name
              };
            } else {
              wedding.place = {
                name
              };
            }
          }
        }
      }
      if (dateTag.length && dateTag[0] && dateTag[0].data) {
        wedding.date = dateTag[0].data;
      }

      // Get husband
      const husband = findTags(family.tree, "HUSB");
      if (!husband || husband.length === 0) {
        // No husband found.
        // Is there a better way to handle this than returning an empty object?
        return {};
      }
      const husbandPointer = husband[0].data;

      // Get wife
      const wife = findTags(family.tree, "WIFE");
      if (!wife || wife.length === 0) {
        // No wife found.
        // Is there a better way to handle this than returning an empty object?
        return {};
      }
      const wifePointer = wife[0].data;

      const spousePointer =
        currentIndividualPointer === wifePointer ? husbandPointer : wifePointer;

      const spouse = individuals.find(
        ({ pointer }) => pointer === spousePointer
      );
      if (!spouse || Object.keys(spouse).length === 0) {
        return {};
      }

      const { fname, lname } = getNames(spouse)[0];
      const id = getId(spouse, "I");

      wedding.spouse = {
        id,
        fname,
        lname
      };

      return wedding;
    })
    .reduce((acc, val) => acc.concat(val), []);
};

export default getWeddings;

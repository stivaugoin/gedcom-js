// @flow
import gedcom from "parse-gedcom";

import formatIndividuals from "./individuals";
import getAllPlaces from "./places/getAllPlaces";

import type { Individuals } from "./types/individuals";
import type { Seeds } from "./types/seeds";

const parse = (
  file: string
): {
  individuals: Individuals
} => {
  const parsed: Seeds = gedcom.parse(file);

  const INDI: Seeds = parsed.filter(node => node.tag === "INDI");
  const FAM: Seeds = parsed.filter(node => node.tag === "FAM");

  const places = getAllPlaces(parsed);
  const individuals = formatIndividuals({
    individuals: INDI,
    families: FAM,
    places
  });

  return { individuals, places };
};

export default { parse };

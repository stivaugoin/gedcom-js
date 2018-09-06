// @flow
import gedcom from "parse-gedcom";

import formatIndividuals from "./individuals";

import type { Individuals } from "./types/individuals";
import type { Seeds } from "./types/seeds";

const parse = (
  file: File
): {
  individuals: Individuals
} => {
  const parsed: Seeds = gedcom.parse(file);

  const INDI: Seeds = parsed.filter(node => node.tag === "INDI");
  const FAM: Seeds = parsed.filter(node => node.tag === "FAM");

  const individuals = formatIndividuals({
    individuals: INDI,
    families: FAM
  });

  return { individuals };
};

export default { parse };

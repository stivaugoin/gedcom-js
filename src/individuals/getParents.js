// @flow
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
  return [];
};

export default getParents;

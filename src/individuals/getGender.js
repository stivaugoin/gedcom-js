// @flow
import findTags from "../helpers/findTags";

import type { Seed } from "../types/seeds";
import type { Gender } from "../types/individuals";

/**
 * Input
 *  [{ tag: "SEX", data: "M" }]
 * Output
 *  "M"
 */
const getGender = (node: Seed): Gender => {
  const tag = findTags(node.tree, "SEX")[0];

  if (!tag || !tag.data) {
    return null;
  }

  return tag.data;
};

export default getGender;

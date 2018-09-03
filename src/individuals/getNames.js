// @flow
import findTags from "../helpers/findTags";

import type { Name } from "../types/individuals";
import type { Seed } from "../types/seeds";

/**
 * Input
 *  [ { tag: "NAME", data: "fname /lname/" } ]
 * Output
 *  [ { fname: "fname", lname: "lname" } ]
 *
 * TODO: Handle many names
 */

const getNames = (node: Seed): Array<Name> => {
  const nameNode = findTags(node.tree, "NAME")[0].data;
  const [fname, lname] = nameNode.split("/").map(n => n.trim());
  return [{ fname, lname }];
};

export default getNames;

// @flow
import type { Seed } from "../types/seeds";

/**
 * Convert @P1@ to P1
 * If letter is provided, change the default lettre by the new
 */
const getId = (node: Seed, letter: string): string => {
  const pointer = node.pointer.slice(1, -1);

  if (!letter) {
    return pointer;
  }

  return pointer.replace(pointer[0], letter);
};

export default getId;

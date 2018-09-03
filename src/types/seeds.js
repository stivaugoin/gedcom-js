// @flow

export type Seed = {|
  pointer: string,
  tag: string,
  data: string,
  tree: Array<Seed>
|};

export type Seeds = Array<Seed>;

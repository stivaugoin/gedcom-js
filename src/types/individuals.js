// @flow
export type IndividualId = string;

export type Name = {|
  fname?: string,
  lname?: string
|};

export type OtherIndividual = {|
  id?: IndividualId,
  ...Name
|};

export type Children = Array<OtherIndividual>;

export type Parents = Array<{|
  relation: "father" | "mother",
  ...OtherIndividual
|}>;

export type Gender = ?"F" | "M";

export type Birth = {|
  date: string,
  place: {|
    id: string,
    name: string
  |}
|};

export type Births = Array<Birth>;

export type Death = {|
  date: string,
  place: {|
    id: string,
    name: string
  |}
|};

export type Deaths = Array<Death>;

export type Individual = {|
  id: IndividualId,
  children: Children,
  names: Array<Name>,
  parents: Parents,
  gender: ?Gender
|};

export type Individuals = Array<Individual>;

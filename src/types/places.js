// @flow

export type PlaceId = string;

export type Place = {|
  id: PlaceId,
  name: string,
  count?: number
|};

export type Places = Array<Place>;

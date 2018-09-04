# gedcom-js

[![npm](https://img.shields.io/npm/v/gedcom-js.svg)](https://www.npmjs.com/package/gedcom-js)
![CircleCI branch](https://img.shields.io/circleci/project/github/stivaugoin/gedcom-js/master.svg)
![GitHub](https://img.shields.io/github/license/stivaugoin/gedcom-js.svg)

Convert a GEDCOM file into a JS object.

## Usage

Yarn

```
yarn add gedcom-js
```

NPM

```
npm i -s gedcom-js
```

## API

`.parse(string)`

> const string = fs.readFileSync("path/file.ged", "utf8");

## Example

Input:

```
0 @P1@ INDI
1 NAME Harry /Potter/
1 SEX M
1 FAMC @F1@
0 @P2@ INDI
1 NAME James /Potter/
1 SEX M
1 FAMS @F1@
0 @P3@ INDI
1 NAME Lily /Evans/
1 SEX F
1 FAMS @F1@
0 @F1@ FAM
1 HUSB @P2@
1 WIFE @P3@
1 CHIL @P1@
```

Output:

```
{
  individuals: [
    {
      id: "I1",
      gender: "M",
      names: [
        {
          fname: "Harry",
          lname: "Potter",
        },
      ],
      children: [],
      parents: [
        {
          id: "I2",
          relation: "father",
          fname: "James",
          lname: "Potter",
        },
        {
          id: "I3",
          relation: "mother",
          fname: "Lily",
          lname: "Evans",
        }
      ],
    },
    {
      id: "I2",
      gender: "M",
      names: [
        {
          fname: "James",
          lname: "Potter",
        },
      ],
      children: [
        {
          id: "I1",
          fname: "Harry",
          lname: "Potter",
        },
      ],
      parents: [],
    },
    {
      id: "I3",
      gender: "F",
      names: [
        {
          fname: "Lily",
          lname: "Evans",
        },
      ],
      children: [
        {
          id: "I1",
          fname: "Harry",
          lname: "Potter",
        },
      ],
    }
  ],
}
```

## Roadmap

- Improve this README
- Add more information about individuals
  - Birth
  - Marriage
  - Death
  - Baptism
  - ...
- Parse places
- Parse sources

## License

MIT

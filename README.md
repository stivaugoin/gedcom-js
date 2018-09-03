# gedcom-js

[![npm](https://img.shields.io/npm/v/gedcom-js.svg?style=flat-square)](https://www.npmjs.com/package/gedcom-js)
![GitHub](https://img.shields.io/github/license/stivaugoin/gedcom-js.svg?style=flat-square)


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

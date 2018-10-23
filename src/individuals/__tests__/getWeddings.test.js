/* eslint-disable no-undef */
import getWeddings from "../getWeddings";

describe("getWeddings()", () => {
  const individual = {
    pointer: "@P1@",
    tag: "INDI",
    tree: [{ tag: "FAMS", data: "@F1@" }]
  };

  const individuals = [
    {
      pointer: "@P1@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "First /Parent/" }, { tag: "SEX", data: "F" }]
    },
    {
      pointer: "@P2@",
      tag: "INDI",
      tree: [
        { tag: "NAME", data: "Second /Parent/" },
        { tag: "SEX", data: "M" }
      ]
    }
  ];

  const families = [
    {
      pointer: "@F1@",
      tag: "FAM",
      tree: [
        { tag: "WIFE", data: "@P1@" },
        { tag: "HUSB", data: "@P2@" },
        {
          tag: "MARR",
          tree: [
            { tag: "DATE", data: "1979" },
            { tag: "PLAC", data: "Cokeworth, Midlands, England, Great Britain" }
          ]
        }
      ]
    }
  ];

  const places = [
    {
      
    }
  ]

  test("should throw an error when individual is missing", () => {
    function callGetWeddings() {
      getWeddings({ individuals, families });
    }
    expect(callGetWeddings).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individual is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual: {}, individuals, families });
    }
    expect(callGetWeddings).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individuals is missing", () => {
    function callGetWeddings() {
      getWeddings({ individual, families });
    }
    expect(callGetWeddings).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when individuals is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals: [], families });
    }
    expect(callGetWeddings).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when families is missing", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals });
    }
    expect(callGetWeddings).toThrowError("families is missing or empty");
  });

  test("should throw an error when families is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals, families: [] });
    }
    expect(callGetWeddings).toThrowError("families is missing or empty");
  });

  test("should returns an empty array when individual don't have FAMS tag", () => {
    const ind = { ...individual };
    ind.tree = [];
    expect(getWeddings({ individual: ind, individuals, families })).toEqual(
      expect.arrayContaining([])
    );
  });

  test("should returns an empty array when family is not found", () => {
    const newFamilies = [{ pointer: "@F2@" }];

    expect(
      getWeddings({ individual, individuals, families: newFamilies })
    ).toEqual(expect.arrayContaining([]));
  });

  // test("should returns an array with an empty object when children isn't found", () => {
  //   const newIndividuals = [{ pointer: "@P2@" }];

  //   expect(
  //     getWeddings({ individual, individuals: newIndividuals, families })
  //   ).toEqual(expect.arrayContaining([{}]));
  // });

  test("should returns an array of children from one family", () => {
    const children = getChildren({ individual, individuals, families });

    const expected = [
      {
        date: "1979",
        place: {
          id: 
        }
      }
    ];

    expect(children).toEqual(expect.arrayContaining(expected));
  });

  test("should returns an array of children from two families", () => {
    individual.tree.push({ tag: "FAMS", data: "@F2@" });
    families.push({
      pointer: "@F2@",
      tag: "FAM",
      tree: [{ tag: "CHIL", data: "@P2@" }, { tag: "CHIL", data: "@P3@" }]
    });

    const children = getChildren({ individual, individuals, families });

    const expected = [
      {
        id: "I1",
        fname: "First",
        lname: "Child"
      },
      {
        id: "I2",
        fname: "Second",
        lname: "Child"
      },
      {
        id: "I3",
        fname: "Third",
        lname: "Child"
      }
    ];

    expect(children).toEqual(expect.arrayContaining(expected));
  });
});

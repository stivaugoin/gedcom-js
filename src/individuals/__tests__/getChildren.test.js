/* eslint-disable no-undef */
import getChildren from "../getChildren";

describe("getChildren()", () => {
  const individual = {
    pointer: "@P2@",
    tag: "INDI",
    tree: [{ tag: "FAMS", data: "@F1@" }]
  };

  const individuals = [
    {
      pointer: "@P1@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "First /Child/" }]
    },
    {
      pointer: "@P2@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "Second /Child/" }]
    },
    {
      pointer: "@P3@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "Third /Child/" }]
    }
  ];

  const families = [
    {
      pointer: "@F1@",
      tag: "FAM",
      tree: [{ tag: "CHIL", data: "@P1@" }]
    }
  ];

  test("should throw an error when individual is missing", () => {
    function callGetChildren() {
      getChildren({ individuals, families });
    }
    expect(callGetChildren).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individual is empty", () => {
    function callGetChildren() {
      getChildren({ individual: {}, individuals, families });
    }
    expect(callGetChildren).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individuals is missing", () => {
    function callGetChildren() {
      getChildren({ individual, families });
    }
    expect(callGetChildren).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when individuals is empty", () => {
    function callGetChildren() {
      getChildren({ individual, individuals: [], families });
    }
    expect(callGetChildren).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when families is missing", () => {
    function callGetChildren() {
      getChildren({ individual, individuals });
    }
    expect(callGetChildren).toThrowError("families is missing or empty");
  });

  test("should throw an error when families is empty", () => {
    function callGetChildren() {
      getChildren({ individual, individuals, families: [] });
    }
    expect(callGetChildren).toThrowError("families is missing or empty");
  });

  test("should returns an empty array when individual don't have FAMS tag", () => {
    const ind = { ...individual };
    ind.tree = [];
    expect(getChildren({ individual: ind, individuals, families })).toEqual(
      expect.arrayContaining([])
    );
  });

  test("should returns an empty array when family is not found", () => {
    const newFamilies = [{ pointer: "@F2@" }];

    expect(
      getChildren({ individual, individuals, families: newFamilies })
    ).toEqual(expect.arrayContaining([]));
  });

  test("should returns an array with an empty object when children isn't found", () => {
    const newIndividuals = [{ pointer: "@P2@" }];

    expect(
      getChildren({ individual, individuals: newIndividuals, families })
    ).toEqual(expect.arrayContaining([{}]));
  });

  test("should returns an array of children from one family", () => {
    const children = getChildren({ individual, individuals, families });

    const expected = [
      {
        id: "I1",
        fname: "First",
        lname: "Child"
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

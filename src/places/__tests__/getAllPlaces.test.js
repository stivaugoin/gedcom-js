/* eslint-disable no-undef */
import getAllPlaces from "../getAllPlaces";

describe("getAllPlaces", () => {
  test("should returns an array that contains an id, a name and a count", () => {
    const node = [
      {
        tree: [
          {
            tag: "PLAC",
            data: "Cokeworth, Midlands, England, Great Britain"
          }
        ]
      }
    ];

    expect(getAllPlaces(node)).toEqual(
      expect.arrayContaining([
        {
          id: "P1",
          name: "Cokeworth, Midlands, England, Great Britain",
          count: 1
        }
      ])
    );
  });

  test("should includes the number of time a place is mentioning", () => {
    const node = [
      {
        tree: [
          {
            tag: "DATE",
            data: "1980-07-31"
          },
          {
            tag: "PLAC",
            data: "Cokeworth, Midlands, England, Great Britain"
          }
        ]
      },
      {
        tree: [
          {
            tag: "DATE",
            data: "1980-07-31"
          },
          {
            tag: "PLAC",
            data: "Cokeworth, Midlands, England, Great Britain"
          }
        ]
      }
    ];

    expect(getAllPlaces(node)).toEqual(
      expect.arrayContaining([
        {
          id: "P1",
          name: "Cokeworth, Midlands, England, Great Britain",
          count: 2
        }
      ])
    );
  });

  test("should increment the Id of places", () => {
    const node = [
      {
        tree: [
          {
            tag: "PLAC",
            data: "Cokeworth, Midlands, England, Great Britain"
          }
        ]
      },
      {
        tree: [
          {
            tag: "PLAC",
            data: "England, Great Britain"
          }
        ]
      }
    ];

    expect(getAllPlaces(node)).toEqual(
      expect.arrayContaining([
        {
          id: "P1",
          name: "Cokeworth, Midlands, England, Great Britain",
          count: 1
        },
        {
          id: "P2",
          name: "England, Great Britain",
          count: 1
        }
      ])
    );
  });

  test("should found all places in different level", () => {
    const node = [
      {
        tree: [
          {
            tag: "PLAC",
            data: "Cokeworth, Midlands, England, Great Britain"
          }
        ]
      },
      {
        tree: [
          {
            tree: [
              {
                tag: "PLAC",
                data: "England, Great Britain"
              }
            ]
          }
        ]
      },
      {
        tree: [
          {
            tree: [
              {
                tree: [
                  {
                    tag: "PLAC",
                    data: "Great Britain"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    expect(getAllPlaces(node)).toEqual(
      expect.arrayContaining([
        {
          id: "P1",
          name: "Cokeworth, Midlands, England, Great Britain",
          count: 1
        },
        {
          id: "P2",
          name: "England, Great Britain",
          count: 1
        },
        {
          id: "P3",
          name: "Great Britain",
          count: 1
        }
      ])
    );
  });
});

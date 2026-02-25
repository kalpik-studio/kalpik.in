import { describe, expect, test } from "vitest";
import { refactorListInHierarchy } from "../pb-utils";

describe("refactorListInHierarchy", () => {
  test("should refactor with 'parent' key", () => {
    const list = [
      { id: "1", parent: undefined },
      { id: "2", parent: "1" },
      { id: "3", parent: "1" },
      { id: "4", parent: "2" },
      { id: "5", parent: undefined },
      { id: "6", parent: "3" },
      { id: "7", parent: "7" },
    ];
    const result = refactorListInHierarchy(list);

    expect(result).toEqual([
      {
        id: "1",
        parent: undefined,
        children: [
          { id: "2", parent: "1", children: [{ id: "4", parent: "2" }] },
          { id: "3", parent: "1", children: [{ id: "6", parent: "3" }] },
        ],
      },
      { id: "5", parent: undefined },
      { id: "7", parent: "7" },
    ]);
  });
});

import { describe, expect, test } from "vitest";
import { calculateVisiblePages } from "../pagination-utils";

describe("calculateVisiblePages, limit=5", () => {
  const limit = 5;
  describe("totalPage=5 (<=limit)", () => {
    const totalPages = limit;
    test("page=1", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });
    test("page=3", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });
    test("page=5", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("totalPage=10 (>limit)", () => {
    const totalPages = 10;
    test("page=1", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 0, 10]);
    });
    test("page=3", () => {
      const pages = calculateVisiblePages(totalPages, 3, limit);
      expect(pages).toEqual([1, 2, 3, 0, 10]);
    });
    test("page=5", () => {
      const pages = calculateVisiblePages(totalPages, 5, limit);
      expect(pages).toEqual([1, 0, 5, 0, 10]);
    });
    test("page=8", () => {
      const pages = calculateVisiblePages(totalPages, 10, limit);
      expect(pages).toEqual([1, 0, 8, 9, 10]);
    });
    test("page=10", () => {
      const pages = calculateVisiblePages(totalPages, 10, limit);
      expect(pages).toEqual([1, 0, 8, 9, 10]);
    });
  });
});

describe("calculateVisiblePages, limit=7", () => {
  const limit = 7;
  describe("totalPage=5 (<=limit)", () => {
    const totalPages = 5;
    test("page=1", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });
    test("page=3", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });
    test("page=5", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("totalPage=10 (>limit)", () => {
    const totalPages = 10;
    test("page=1", () => {
      const pages = calculateVisiblePages(totalPages, 1, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5, 0, 10]);
    });
    test("page=3", () => {
      const pages = calculateVisiblePages(totalPages, 3, limit);
      expect(pages).toEqual([1, 2, 3, 4, 5, 0, 10]);
    });
    test("page=5", () => {
      const pages = calculateVisiblePages(totalPages, 5, limit);
      expect(pages).toEqual([1, 0, 4, 5, 6, 0, 10]);
    });
    test("page=8", () => {
      const pages = calculateVisiblePages(totalPages, 10, limit);
      expect(pages).toEqual([1, 0, 6, 7, 8, 9, 10]);
    });
    test("page=10", () => {
      const pages = calculateVisiblePages(totalPages, 10, limit);
      expect(pages).toEqual([1, 0, 6, 7, 8, 9, 10]);
    });
  });
});

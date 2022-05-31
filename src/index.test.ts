import { hello } from "./";

describe("Index Test", () => {
  it("Should test index function", () => {
    const expected = "Hello there!";
    const result = hello();

    expect(result).toBe(expected);
  });
});

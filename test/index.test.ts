import EventHandler from "../src/index";

describe("testing index file", () => {
  test("class can be initiated", () => {
    const c = new EventHandler();
    expect(c).toBeInstanceOf(EventHandler);
  });
});

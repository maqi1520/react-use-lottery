import { renderHook } from "@testing-library/react-hooks";
import useLottery from "./useLottery";
import faker from "@faker-js/faker";

describe("useAwards", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return showUsers", () => {
    const users = new Array(10).fill(null).map((item, index) => ({
      id: index + 1,
      name: faker.name.lastName() + faker.name.firstName(),
    }));
    const awards = [
      {
        name: "一等奖",
        count: 10,
        time: 10,
      },
      {
        name: "二等奖",
        count: 30,
        time: 5,
      },
      {
        name: "三等奖",
        count: 50,
        time: 5,
      },
    ];
    const view = renderHook(() => useLottery(users, awards));
    const { toggle } = view.result.current;
    expect(typeof toggle).toBe("function");
  });
});

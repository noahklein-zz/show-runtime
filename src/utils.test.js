require("jasmine-check").install();
const { divMod, sum, minToDuration, formatOutput } = require("./utils");

describe("divMod", () => {
  check.it(
    "returns the quotient and remainder",
    gen.sPosInt,
    gen.sPosInt,
    (x, y) => {
      const [quotient, remainder] = divMod(x, y);
      expect(y * quotient + remainder).toBe(x);
    }
  );
});

describe("sum", () => {
  check.it("returns the sum of the array", gen.array(gen.sPosInt), arr => {
    let _sum = 0;
    for (const x of arr) {
      _sum += x;
    }
    expect(sum(arr)).toBe(_sum);
  });
});

describe("minToDuration", () => {
  check.it(
    "calculates the duration correctly",
    { times: 500 },
    gen.intWithin(0, 5000),
    n => {
      const { days, hrs, mins } = minToDuration(n);
      expect(days * 60 * 24 + hrs * 60 + mins).toBe(n);
    }
  );
});

describe("formatOutput", () => {
  expect(formatOutput(10, 5, 3)).toBe("10 days 5 hours 3 minutes");
  expect(formatOutput(10, 0, 0)).toBe("10 days");
  expect(formatOutput(10, 5, 0)).toBe("10 days 5 hours");
  expect(formatOutput(0, 5, 3)).toBe("5 hours 3 minutes");
  expect(formatOutput(0, 5, 0)).toBe("5 hours");
  expect(formatOutput(0, 0, 3)).toBe("3 minutes");
  expect(formatOutput(0, 0, 0)).toBe("0 minutes");
});

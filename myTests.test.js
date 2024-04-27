const {
  sum,
  myFunction,
  fetchData,
  fetchDataWithPromise
} = require('./myTests')

test("add 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3)
})

test("shold assign to object coorrectly", () => {
  const obj = { name: "John" }
  obj["age"] = 30
  expect(obj).toEqual({ name: "John", age: 30 })
})

test("one should be truthy", () => {
  const number = 1;
  expect(number).toBeTruthy();
});
test("Throws on invalid input", () => {
  expect(() => {
    myFunction("some string");
  }).toThrow();
});

// Para testear callbacks
test("The data is apple", (done) => {
  function callbackFunc(data) {
    try {
      expect(data).toBe("apple");
      done();
    } catch (e) {
      done(e);
    }
  }
  fetchData(callbackFunc);
});

// Para testear con promesas
// sin async/await
test("The data is apple (Promise)", () => {
  return expect(fetchDataWithPromise("resolve")).resolves.toBe("apple");
});
// con async/await
test("The fetch fails (Promise)", async () => {
  // se peude separar asi, realizando la operacion y luega checkeando
  // const data = await fetchDataWithPromise()
  // expect(data).toBe("apple")
  // o directamente realizando la comparacion con await
  await expect(fetchDataWithPromise()).rejects.toThrow(
    "Fetch operation failed"
  );
});

test("Mock implementation of a basic function", () => {
  const mock = jest.fn((x) => 40 + x);
  expect(mock(2)).toBe(42);
  expect(mock).toHaveBeenCalledWith(2);
});

test("spying on a method of an object", () => {
  const video = {
    play() {
      return true;
    },
  };
  const spy = jest.spyOn(video, "play");
  expect(video.play()).toBe(true);
});

describe("-- Test batch --", () => {
  // Should return the sum of two positive integers
  it("should return the sum of two positive integers when both parameters are positive", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });

  // Should return NaN if one of the parameters is not a number
  it("should return NaN when one of the parameters is not a number", () => {
    const result = sum(2, "a");
    expect(result).toBeNaN();
  });

  // Should return the sum of two negative integers
  it("should return the sum of two negative integers when both parameters are negative", () => {
    const result = sum(-2, -3);
    expect(result).toBe(-5);
  });

  // Should return the sum of a positive and a negative integer
  it("should return the sum of a positive and a negative integer when both parameters have different signs", () => {
    const result = sum(2, -3);
    expect(result).toBe(-1);
  });

  // Should return the sum of two decimal numbers
  it("should return the sum of two decimal numbers when both parameters are decimal", () => {
    const result = sum(2.5, 3.7);
    expect(result).toBe(6.2);
  });

  // Should return the sum of a number and zero
  it("should return the sum of a number and zero when the number is positive", () => {
    const result = sum(5, 0);
    expect(result).toBe(5);
  });

  // Should return Infinity if one of the parameters is Infinity
  it("should return Infinity when one of the parameters is Infinity", () => {
    const result = sum(Infinity, 3);
    expect(result).toBe(Infinity);
  });

  // Should return -Infinity if one of the parameters is -Infinity
  it("should return -Infinity when one of the parameters is -Infinity", () => {
    const result = sum(-Infinity, 5);
    expect(result).toBe(-Infinity);
  });

  // Should return a string if one of the parameters is a string that can be converted to a number
  it("should return a string when one of the parameters is a string that can be converted to a number", () => {
    const result = sum("2", 3);
    expect(typeof result).toBe("string");
  });
});

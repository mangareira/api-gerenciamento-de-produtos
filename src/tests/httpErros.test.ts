import { HttpErros } from "../interface/httpErros";

describe("HttpErros", () => {
  it("should create an error with status and message", () => {
    const error = new HttpErros(400, "Bad Request");
    expect(error.status).toBe(400);
    expect(error.message).toBe("Bad Request");
  });

  it("should create an error with default status 500 if no status is provided", () => {
    const error = new HttpErros(500, "Internal Server Error");
    expect(error.status).toBe(500);
    expect(error.message).toBe("Internal Server Error");
  });
});

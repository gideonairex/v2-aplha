import { describe, expect, it } from "@jest/globals";
import app from "src/app";

describe("Health", () => {
  describe("Health Check", () => {
    it("Should return 200", async () => {
      const res = await app.request("/api/v1/healthz", {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      const responseData = await res.json();
      expect(responseData.status).toBe("healthy is real");
      expect(res.status).toBe(200);
    });
  });
});

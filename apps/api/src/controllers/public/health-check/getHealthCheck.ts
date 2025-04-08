import type { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute, z } from "@hono/zod-openapi";
import { defaultZodResponses } from "../../../utils/openApi";

export default function (app: OpenAPIHono) {
  app.openapi(
    createRoute({
      method: "get",
      path: "/",
      description: "API Health check",
      responses: { ...defaultZodResponses(z.object({ status: z.string() })) },
      tags: ["System"],
    }),
    (c) => {
      return c.json({ status: "healthy" });
    },
  );
}
export const order = 1;

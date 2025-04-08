import { type RouteConfig, createRoute, z } from "@hono/zod-openapi";
import type { ZodObject, ZodRawShape, ZodTypeAny } from "zod";

// TODO: handle error and success code
export const defaultZodResponses = <T extends ZodTypeAny>(
  schema: T,
  meta?: ZodObject<ZodRawShape>,
) => {
  let metaZod: ZodObject<ZodRawShape> = z.object({
    timestamp: z.string(),
  });

  if (meta) {
    metaZod = metaZod.merge(meta);
  }

  return {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.number(),
            message: z.string(),
            data: schema,
            meta: metaZod,
          }),
        },
      },
      description: "OK",
    },
    500: {
      description: "ERR_INTERNAL_SERVER_ERROR",
    },
  };
};

export const createSecureRoute = <
  P extends string,
  R extends Omit<RouteConfig, "path"> & { path: P },
>(
  routeConfig: R,
) => {
  return createRoute({
    ...routeConfig,
    security: [{ AccessToken: [], UserInfo: [] }],
  });
};

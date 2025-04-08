import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";

import registerControllerRoutes from "./controllers";

const DEFAULT_VERSION = "v1";
const BASE_PATH = "/api";

// Basic Configuration
const version: string = process.env.version || DEFAULT_VERSION;
const activeBasePath: string = `${BASE_PATH}/${version}`;

const app = new OpenAPIHono().basePath(activeBasePath);

/**
 * Middleware
 * The list of middleware functions that are executed
 */
if (process.env.NODE_ENV !== "test") {
  app.use("*", requestId());
  app.use("*", async (c, next) => {
    const startTime = Date.now();
    await next();

    const duration = Date.now() - startTime;
    console.log("Response", {
      requestId: c.var.requestId,
      method: c.req.method,
      url: c.req.url,
      status: c.res.status,
      duration: `${duration}ms`,
    });
  });
}
app.use(prettyJSON());
app.use(cors());

/**
 * Register Controller Routes
 */
registerControllerRoutes(app);

/**
 * OpenAPI Documentation
 * This endpoint returns the OpenAPI documentation for the API.
 */
app.doc("/doc", (c) => {
  const host = c.req.header("host");
  const { APP_URL } = process.env;
  const isLocal =
    host?.startsWith("localhost") || host?.startsWith("127.0.0.1");
  /* istanbul ignore next */
  const protocol = isLocal ? "http" : "https";
  return {
    openapi: "3.0.0",
    info: {
      version,
      title: "API by FreshClinics",
      description: "",
      contact: {
        name: "Support Team",
        email: "support@freshclinics.com",
        url: "https://freshclinics.com/support",
      },
    },
    servers: [
      {
        url: APP_URL ? APP_URL : `${protocol}://${host}`,
        description: "Primary API Server for FreshClinics",
      },
    ],
    security: [{ bearerAuth: [] }],
  };
});

// Docs
app.doc("/doc", (c) => {
  const host = c.req.header("host");
  const isLocal =
    host?.startsWith("localhost") || host?.startsWith("127.0.0.1");
  /* istanbul ignore next */
  const protocol = isLocal ? "http" : "https";
  return {
    openapi: "3.0.0",
    info: {
      version,
      title: "Fresh API by Fresh Clinics",
      description:
        "The Fresh API provides endpoints for Fresh API ecosystem, RESTful interactions.",
      contact: {
        name: "Support Team",
        email: "support@freshclinics.com",
        url: "https://freshclinics.com/support",
      },
    },
    servers: [
      {
        url: `${protocol}://${host}`,
        description: "Primary API Server for Fresh",
      },
    ],
  };
});
/**
 * Add Swagger UI for local development
 */
if (process.env.APP_ENV === "local") {
  app.get(
    "/swagger",
    swaggerUI({
      url: "./doc",
      deepLinking: true,
    }),
  );
}

export default app;

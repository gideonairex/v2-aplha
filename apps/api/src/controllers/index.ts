import path from "node:path";
import type { OpenAPIHono } from "@hono/zod-openapi";
import type { MiddlewareHandler } from "hono";
import { honoApp } from "src/libs/hono";
import registerRoutes from "src/utils/registerRoutes";

type Route = {
  middlewares: MiddlewareHandler[];
  routes: { path: string; dir?: string }[];
};

const publicRoute = {
  middlewares: [],
  routes: [{ path: "/healthz", dir: "health-check" }],
};

const handleRoutes = (appMain: OpenAPIHono, route: Route, pathType: string) => {
  const { middlewares, routes } = route;
  for (const route of routes) {
    const dir = route?.dir || route.path.substring(1);

    const appController = honoApp();
    const routesDir = path.join(`${__dirname}/${pathType}`, dir);

    registerRoutes(appController, routesDir, middlewares);

    appMain.route(route.path, appController);
  }
};

export default function registerControllerRoutes(appMain: OpenAPIHono) {
  handleRoutes(appMain, publicRoute, "public");
}

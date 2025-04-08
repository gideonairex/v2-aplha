import fs from "fs";
import path from "path";
import type { OpenAPIHono } from "@hono/zod-openapi";
import type { MiddlewareHandler } from "hono";

/**
 * Checks if the given file has an allowed extension (.js or .ts).
 * @param filePath - The path of the file to check.
 * @returns True if the file has an allowed extension, false otherwise.
 */
function allowedExtension(filePath: string) {
  const fileName = path.basename(filePath);
  return /\.(js|ts)$/.test(fileName);
}

/**
 * Registers routes from the specified directory to the given app.
 * @param app - The OpenAPIHono app instance.
 * @param routesDir - The directory containing route files.
 * @param middlewares - Array of middlewares you want to attach to the route
 */
const registerRoutes = (
  app: OpenAPIHono,
  routesDir: string,
  middlewares: MiddlewareHandler[],
) => {
  const routes: Array<{ route: (app: OpenAPIHono) => void; order: number }> =
    [];

  // Read all files in the routes directory
  fs.readdirSync(routesDir).forEach((file) => {
    // Only process files with allowed extensions
    if (allowedExtension(file)) {
      // Dynamically import the route and its order from the file
      const { default: route, order } = require(path.join(routesDir, file));
      routes.push({ route, order });
    }
  });

  // Sort routes by their order property
  routes.sort((a, b) => a.order - b.order);

  // Register each route with the app
  routes.forEach(({ route }) => {
    middlewares.forEach((middleware) => {
      app.use("*", middleware);
    });

    route(app);
  });
};

export default registerRoutes;

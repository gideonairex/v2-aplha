import { OpenAPIHono } from "@hono/zod-openapi";

// TODO: handle error code
export const honoApp = () =>
  new OpenAPIHono({
    defaultHook: (result) => {
      if (result.success) {
        return;
      }

      const missingFields: string[] = [];
      const invalidFields: string[] = [];
      const { errors } = result.error;

      let message = "";

      errors.forEach((error) => {
        if (error.message === "Required") {
          return missingFields.push(`${error.path[0]}`);
        }
        return invalidFields.push(`${error.path[0]}`);
      });

      if (missingFields.length > 0) {
        message += `The '${missingFields.join(", ")}' field(s) are required. `;
      }

      if (invalidFields.length > 0) {
        message += `Incorrect value for '${invalidFields.join(", ")}' field(s).`;
      }

      message = message.trim();

      throw new Error(message);
    },
  });

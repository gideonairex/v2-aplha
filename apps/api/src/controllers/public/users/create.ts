import type { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute, z } from "@hono/zod-openapi";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { UserSchema } from "prismaZod";
import {
  ErrorCode,
  ErrorStatusCode,
  SuccessStatusCode,
} from "src/constants/apiResponses";
import UserService from "src/services/users/userService";
import buildApiResponse from "src/utils/buildApiResponse";
import { defaultZodResponses } from "src/utils/openApi";

export default function (app: OpenAPIHono) {
  const docs = {
    description: "Create user.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              firstName: z.string().describe("The first name of the user."),
              lastName: z.string().describe("The last name of the user."),
              email: z.string().email().describe("The last email of the user."),
            }),
          },
        },
      },
    },
    responses: {
      ...defaultZodResponses(UserSchema),
      [ErrorStatusCode[ErrorCode.ERR_INVALID_FIELD_VALUE]]: {
        description: `Invalid field value or missing required fields (${ErrorCode.ERR_INVALID_FIELD_VALUE} | ${ErrorCode.ERR_MISSING_FIELD}).`,
      },
    },
    tags: ["Users"],
  };

  app.openapi(
    createRoute({ method: "post", path: "/", ...docs }),
    async (c) => {
      const { email, firstName, lastName } = c.req.valid("json");

      const user = await new UserService().create({
        email,
        firstName,
        lastName,
      });

      const response = buildApiResponse({
        status: SuccessStatusCode.CREATED,
        data: user,
        message: "User created successfully.",
      });

      return c.json(
        response,
        SuccessStatusCode.CREATED as ContentfulStatusCode,
      );
    },
  );
}

export const order = 1;

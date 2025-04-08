import type {
  ApiResponse,
  ErrorPayload,
  SuccessPayload,
} from "../constants/apiResponses";

import { isValidMeta } from "./typeGuards";
/**
 * Builds a structured API response object that includes the provided payload and meta information,
 * such as the timestamp of when the response is created.
 *
 * @template T - The type of data included in the success payload.
 *
 * @param params - The input payload that can either be a `SuccessPayload<T>` or an `ErrorPayload`.
 *   - `SuccessPayload<T>` is expected to include a `data` field with the actual response content, and optionally a `meta` field.
 *   - `ErrorPayload` is expected to include an `error` field and optionally a `meta` field.
 *
 * @returns The formatted `ApiResponse<T>` object containing:
 *   - The provided payload (either `SuccessPayload<T>` or `ErrorPayload`).
 *   - A `meta` object that includes a `timestamp` field indicating when the response was created.
 *
 * Example usage:
 * ```ts
 * const successResponse = buildApiResponse({ data: { id: 1, name: 'Example' } });
 * const errorResponse = buildApiResponse({ error: 'Something went wrong' });
 * ```
 */
const buildApiResponse = <T>(
  params: SuccessPayload<T> | ErrorPayload,
): ApiResponse<T> => {
  const meta = { ...params?.meta, timestamp: new Date().toISOString() };

  if (isValidMeta(meta) === false) {
    throw new Error("Invalid meta object provided");
  }

  const response: ApiResponse<T> = {
    ...params,
    meta,
  };

  return response;
};

export default buildApiResponse;

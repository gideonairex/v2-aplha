/**
 * Represents a set of HTTP status codes used in API responses.
 * These status codes are part of the standard HTTP protocol and indicate the outcome of a request.
 *
 * @type HttpStatusCode
 * @description A type representing the possible HTTP status codes, which includes:
 *
 * - **2xx**: Success
 *   - 200: OK
 *   - 201: Created
 *   - 202: Accepted
 *   - 204: No Content
 *
 * - **4xx**: Client Errors
 *   - 400: Bad Request
 *   - 401: Unauthorized
 *   - 403: Forbidden
 *   - 404: Not Found
 *   - 405: Method Not Allowed
 *   - 409: Conflict
 *   - 422: Unprocessable Entity
 *   - 429: Too Many Requests
 *
 * - **5xx**: Server Errors
 *   - 500: Internal Server Error
 *   - 502: Bad Gateway
 *   - 503: Service Unavailable
 *   - 504: Gateway Timeout
 */

export type SuccessHttpStatusCode = 200 | 201 | 202 | 204;
export type ClientErrorHttpStatusCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 409
  | 413
  | 415
  | 422
  | 423
  | 429;
export type ServerErrorHttpStatusCode = 500 | 502 | 503 | 504;
export type HttpStatusCode =
  | SuccessHttpStatusCode
  | ClientErrorHttpStatusCode
  | ServerErrorHttpStatusCode;

/**
 * List of error codes used in API responses.
 */
export enum ErrorCode {
  ERR_MISSING_FIELD = "ERR_MISSING_FIELD",
  ERR_INVALID_FIELD_VALUE = "ERR_INVALID_FIELD_VALUE",
  ERR_PAYLOAD_TOO_LARGE = "ERR_PAYLOAD_TOO_LARGE",
  ERR_INVALID_REQUEST_FORMAT = "ERR_INVALID_REQUEST_FORMAT",
  ERR_INVALID_VERIFICATION_CODE = "ERR_INVALID_VERIFICATION_CODE",
  ERR_INVALID_TOKEN = "ERR_INVALID_TOKEN",
  ERR_INVALID_API_KEY = "ERR_INVALID_API_KEY",
  ERR_MISSING_AUTH_TOKEN = "ERR_MISSING_AUTH_TOKEN",
  ERR_UNAUTHORIZED_ACCESS = "ERR_UNAUTHORIZED_ACCESS",
  ERR_INSUFFICIENT_PERMISSIONS = "ERR_INSUFFICIENT_PERMISSIONS",
  ERR_NOT_FOUND = "ERR_NOT_FOUND",
  ERR_RESOURCE_CONFLICT = "ERR_RESOURCE_CONFLICT",
  ERR_DUPLICATE_RESOURCE = "ERR_DUPLICATE_RESOURCE",
  ERR_SCHEDULE_CONFLICT = "ERR_SCHEDULE_CONFLICT",
  ERR_METHOD_NOT_ALLOWED = "ERR_METHOD_NOT_ALLOWED",
  ERR_RESOURCE_LOCKED = "ERR_RESOURCE_LOCKED",
  ERR_INVALID_INPUT = "ERR_INVALID_INPUT",
  ERR_UNPROCESSABLE_ENTITY = "ERR_UNPROCESSABLE_ENTITY",
  ERR_TOO_MANY_REQUESTS = "ERR_TOO_MANY_REQUESTS",
  ERR_ACTION_NOT_ALLOWED = "ERR_ACTION_NOT_ALLOWED",
  ERR_LIMIT_EXCEEDED = "ERR_LIMIT_EXCEEDED",
  ERR_RATE_LIMIT = "ERR_RATE_LIMIT",
  ERR_OPERATION_FAILED = "ERR_OPERATION_FAILED",
  ERR_INTERNAL_SERVER_ERROR = "ERR_INTERNAL_SERVER_ERROR",
  ERR_DATABASE_ERROR = "ERR_DATABASE_ERROR",
  ERR_SERVICE_UNAVAILABLE = "ERR_SERVICE_UNAVAILABLE",
  ERR_TIMEOUT = "ERR_TIMEOUT",
  ERR_FILE_NOT_FOUND = "ERR_FILE_NOT_FOUND",
  ERR_FILE_FORMAT_NOT_SUPPORTED = "ERR_FILE_FORMAT_NOT_SUPPORTED",
  ERR_FILE_TOO_LARGE = "ERR_FILE_TOO_LARGE",
  ERR_PAYMENT_REQUIRED = "ERR_PAYMENT_REQUIRED",
  ERR_INSUFFICIENT_FUNDS = "ERR_INSUFFICIENT_FUNDS",
  ERR_TRANSACTION_FAILED = "ERR_TRANSACTION_FAILED",
  ERR_EXTERNAL_API_ERROR = "ERR_EXTERNAL_API_ERROR",
  ERR_DEPENDENCY_FAILURE = "ERR_DEPENDENCY_FAILURE",
  ERR_REQUEST_BLOCKED = "ERR_REQUEST_BLOCKED",
}

/**
 * Mapping of error codes to HTTP status codes.
 */
export const ErrorStatusCode: {
  [key in ErrorCode]: ClientErrorHttpStatusCode | ServerErrorHttpStatusCode;
} = {
  [ErrorCode.ERR_MISSING_FIELD]: 400,
  [ErrorCode.ERR_INVALID_FIELD_VALUE]: 400,
  [ErrorCode.ERR_PAYLOAD_TOO_LARGE]: 413,
  [ErrorCode.ERR_INVALID_REQUEST_FORMAT]: 400,
  [ErrorCode.ERR_INVALID_VERIFICATION_CODE]: 400,
  [ErrorCode.ERR_INVALID_TOKEN]: 401,
  [ErrorCode.ERR_INVALID_API_KEY]: 401,
  [ErrorCode.ERR_MISSING_AUTH_TOKEN]: 401,
  [ErrorCode.ERR_UNAUTHORIZED_ACCESS]: 403,
  [ErrorCode.ERR_INSUFFICIENT_PERMISSIONS]: 403,
  [ErrorCode.ERR_NOT_FOUND]: 404,
  [ErrorCode.ERR_RESOURCE_CONFLICT]: 409,
  [ErrorCode.ERR_DUPLICATE_RESOURCE]: 409,
  [ErrorCode.ERR_SCHEDULE_CONFLICT]: 409,
  [ErrorCode.ERR_METHOD_NOT_ALLOWED]: 405,
  [ErrorCode.ERR_RESOURCE_LOCKED]: 423,
  [ErrorCode.ERR_INVALID_INPUT]: 422,
  [ErrorCode.ERR_UNPROCESSABLE_ENTITY]: 422,
  [ErrorCode.ERR_TOO_MANY_REQUESTS]: 429,
  [ErrorCode.ERR_ACTION_NOT_ALLOWED]: 405,
  [ErrorCode.ERR_LIMIT_EXCEEDED]: 429,
  [ErrorCode.ERR_RATE_LIMIT]: 429,
  [ErrorCode.ERR_OPERATION_FAILED]: 500,
  [ErrorCode.ERR_INTERNAL_SERVER_ERROR]: 500,
  [ErrorCode.ERR_DATABASE_ERROR]: 500,
  [ErrorCode.ERR_SERVICE_UNAVAILABLE]: 503,
  [ErrorCode.ERR_TIMEOUT]: 504,
  [ErrorCode.ERR_FILE_NOT_FOUND]: 404,
  [ErrorCode.ERR_FILE_FORMAT_NOT_SUPPORTED]: 415,
  [ErrorCode.ERR_FILE_TOO_LARGE]: 413,
  [ErrorCode.ERR_PAYMENT_REQUIRED]: 402,
  [ErrorCode.ERR_INSUFFICIENT_FUNDS]: 402,
  [ErrorCode.ERR_TRANSACTION_FAILED]: 402,
  [ErrorCode.ERR_EXTERNAL_API_ERROR]: 502,
  [ErrorCode.ERR_DEPENDENCY_FAILURE]: 502,
  [ErrorCode.ERR_REQUEST_BLOCKED]: 429,
};

/**
 * List of success codes used in API responses.
 */
export enum SuccessCode {
  OK = "OK",
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  NO_CONTENT = "NO_CONTENT",
}

/**
 * Mapping of success codes to HTTP status codes.
 */
export const SuccessStatusCode: {
  [key in SuccessCode]: SuccessHttpStatusCode;
} = {
  [SuccessCode.OK]: 200,
  [SuccessCode.CREATED]: 201,
  [SuccessCode.ACCEPTED]: 202,
  [SuccessCode.NO_CONTENT]: 204,
};

/**
 * Represents the metadata of a paginated response.
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  lastPage?: number;
  firstPage?: number;
  firstPageUrl?: string;
  lastPageUrl?: string;
  nextPageUrl?: string;
  previousPageUrl?: string;
}

/**
 * Represents the cursor used for pagination.
 */
export interface CursorMeta {
  nextResourceId: string | null;
  lastResourceId: string | null;
}

export interface CursorParams {
  limit: number;
  lastResourceId: string | undefined;
}

export interface Meta<CustomFields = Record<string, any>> {
  pagination?: PaginationMeta;
  cursor?: CursorMeta;
  timestamp?: string;
  version?: string;
  customFields?: CustomFields;
}

export type FieldError = {
  field: string;
  message: string;
};

/**
 * Represents the structure of an API response.
 */
export interface ApiResponse<T> {
  status:
    | SuccessHttpStatusCode
    | ClientErrorHttpStatusCode
    | ServerErrorHttpStatusCode;
  data?: T | T[];
  meta?: Meta;
  message: string;
  code?: ErrorCode;
}

export type SuccessPayload<T> = {
  data: T | T[];
  meta?: Meta;
  message: string;
  status: SuccessHttpStatusCode;
};

export type ErrorPayload = {
  message: string;
  status: ClientErrorHttpStatusCode | ServerErrorHttpStatusCode;
  code: ErrorCode;
  meta?: Meta;
  errors?: FieldError[];
};

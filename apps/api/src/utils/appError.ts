import { ErrorCode, ErrorStatusCode } from "src/constants/apiResponses";

export class AppError extends Error {
  public code: ErrorCode;

  public status: number;

  public context: { [key: string]: any } | undefined;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.ERR_INTERNAL_SERVER_ERROR,
    context?: { [key: string]: any },
  ) {
    super(message);
    this.status = ErrorStatusCode[code];
    this.code = code;
    this.context = context;
  }
}

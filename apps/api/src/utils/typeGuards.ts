import type {
  CursorMeta,
  Meta,
  PaginationMeta,
} from "src/constants/apiResponses";

function isValidPaginationMeta(value: any): value is PaginationMeta {
  return (
    typeof value === "object" &&
    value !== null &&
    value.currentPage !== undefined &&
    typeof value.currentPage === "number" &&
    value.totalPages !== undefined &&
    typeof value.totalPages === "number" &&
    value.totalItems !== undefined &&
    typeof value.totalItems === "number"
  );
}

function isValidCursorMeta(value: any): value is CursorMeta {
  return (
    typeof value === "object" &&
    value !== null &&
    (value.nextResourceId === null ||
      typeof value.nextResourceId === "string") &&
    (value.lastResourceId === null || typeof value.lastResourceId === "string")
  );
}

function isValidCustomFields(value: any): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

export function isValidMeta(value: any): value is Meta {
  return (
    typeof value === "object" &&
    value !== null &&
    (value.timestamp === undefined || typeof value.timestamp === "string") &&
    (value.customFields === undefined ||
      isValidCustomFields(value.customFields)) &&
    (value.cursor === undefined || isValidCursorMeta(value.cursor)) &&
    (value.pagination === undefined || isValidPaginationMeta(value.pagination))
  );
}

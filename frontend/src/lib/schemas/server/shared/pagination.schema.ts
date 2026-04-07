import { z } from 'zod';

/**
 * ---- Offset Pagination ----
 */
export const OffsetPaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * ---- Cursor Pagination ----
 */
export const CursorPaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type TOffsetPagination = z.infer<typeof OffsetPaginationSchema>;
export type TCursorPagination = z.infer<typeof CursorPaginationSchema>;

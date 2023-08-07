import { PaginationQuery } from "./pagination-query.interface";

export interface CommentsRequestBody extends PaginationQuery {
  userId: number;
}

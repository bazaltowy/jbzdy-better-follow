import { Comment } from "./comment.interface";
import { Pagination } from "./pagination.inteface";
import { ResponseBase } from "./response-base.interface";

export interface Comments extends ResponseBase {
  pagination: Pagination<Comment[]>;
}

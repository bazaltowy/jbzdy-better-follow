import { Filter } from "./filter.interface";
import { ResponseBase } from "./response-base.interface";

export interface Filters extends ResponseBase {
  filters: Filter[];
}

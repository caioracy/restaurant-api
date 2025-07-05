import { MenuItem } from "@infrastructure/database/models/menu-item.model";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
export interface GetMenuByCategoryResponse {
  data: MenuItem[];
  meta: PaginationMeta;
}

export interface PaginatedResult<T> {
  page: number;
  limit: number;
  totalPages: number;
  categories: T[];
  next?: string;
  prev?: string;
}

export interface PaginatedResult<T> {
  page: number;
  limit: number;
  totalPages: number;
  categories?: T[];
  products?: T[];
  next?: string;
  prev?: string;
}

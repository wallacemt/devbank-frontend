export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: boolean;
  paged: boolean;
  unpaged: boolean;
}

export interface Sortable {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sortable;
  numberOfElements: number;
  empty: boolean;
}

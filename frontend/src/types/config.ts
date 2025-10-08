export interface TableConfig {
  columns: { field: string; headerName: string }[];
  defaultSort: { field: string; direction: "asc" | "desc" };
}

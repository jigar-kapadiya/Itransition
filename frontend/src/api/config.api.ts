import { api } from "./axios-client";

export type TableConfig = {
    columns: { field: string; headerName: string }[];
    defaultSort: { field: string; direction: "asc" | "desc" };
};

export const fetchConfig = async () => {
    const { data } = await api.get<{ data: TableConfig }>("/api/config");
    return data.data;
};

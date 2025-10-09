import { api } from "./axios-client";

export type DrugRow = {
    id: number; code: string; name: string; company: string; launchDate: string;
};

export const fetchDrugs = async (params: { page: number; limit: number; company?: string; }) => {
    const { data } = await api.get<{ data: { rows: DrugRow[], total: number }}>("/api/drugs", { params });
    return data.data;
};

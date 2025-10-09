import { api } from "./axios-client";

export const fetchCompany = async () => {
    const { data } = await api.get<{ data: string[] }>("/api/companies");
    return data.data;
};

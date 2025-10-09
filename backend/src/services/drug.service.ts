import prisma from "../db/prisma";
import { Result } from "../types/result";

type Drug = {
    id: string;
    code: string;
    name: string;
    company: string;
    launchDate: string;
}

export class DrugsService {
    constructor() { }

    async getAll(params: { page: number; limit: number; company?: string; }): Promise<Result<{ rows: Drug[], total: number }>> {
        const { company, limit, page } = params;
        const drugs = await prisma.drug.findMany({
            where: company ? { company } : undefined,
            orderBy: { launchDate: "desc" }, // default sort
            take: limit || 10,
            skip: ((page || 1) - 1) * limit,
        });

        // FE display-able transformation
        const result = drugs.map((d) => ({
            id: d.id,
            code: d.code,
            name: `${d.genericName} (${d.brandName})`,
            company: d.company,
            launchDate: d.launchDate.toISOString(),
        }));

        const total = await prisma.drug.count({ where: company ? { company } : undefined, })
        return {
            data: { rows: result, total }
        }
    }

    async getAllCompanies(): Promise<Result<string[]>> {
        const companies = await prisma.drug.findMany({
            distinct: "company",
            select: {
                company: true,
            }
        });

        return { data: companies.map((j) => j.company), };
    }


}
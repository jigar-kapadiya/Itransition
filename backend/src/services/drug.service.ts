import prisma from "../db/prisma";
import { Result } from "../types/result";

export class DrugsService {
    constructor() { }

    async getAll(params: { page: number; limit: number; company?: string; }): Promise<Result<any[]>> {
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

        return {
            data: result,
        }
    }
}
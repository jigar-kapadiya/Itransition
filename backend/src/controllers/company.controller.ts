import { Request, Response, Router } from "express";
import { DrugsService } from "../services/drug.service";
import { IController } from "../interfaces/controller.interface";

export class CompaniesController implements IController {
    router: Router;
    path: string;

    constructor(private readonly drugsService: DrugsService) {
        this.router = Router();
        this.path = '/companies';
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get(this.path, (req: Request, res: Response) => this.getAll(req, res).catch())
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const result = await this.drugsService.getAllCompanies();
        res.json(result);
    }

}
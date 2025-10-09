import { Request, Response, Router } from "express";
import { DrugsService } from "../services/drug.service";
import { IController } from "../interfaces/controller.interface";

export class DrugsController implements IController {
    router: Router;
    path: string;

    constructor(private readonly drugsService: DrugsService) {
        this.router = Router();
        this.path = '/drugs';
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, (req: Request, res: Response) => this.getAll(req, res).catch())
    }

    async getAll(req: Request, res: Response) {
        const company = req.query.company?.toString();
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const result = await this.drugsService.getAll({ company, limit, page });
        res.json(result);
    }

}
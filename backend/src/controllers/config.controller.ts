import { Request, Response, Router } from "express";
import { IController } from "../interfaces/controller.interface";

export class ConfigController implements IController {
    router: Router;
    path: string;

    constructor() {
        this.router = Router();
        this.path = '/config';
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, (req: Request, res: Response) => this.getAll(req, res).catch())
    }

    async getAll(req: Request, res: Response) {
        res.json(
            {
                data: {
                    columns: [
                        { field: "id", headerName: "Id", width: 170 },
                        { field: "code", headerName: "Code" },
                        { field: "name", headerName: "Name", width: 270 },
                        { field: "company", headerName: "Company", width: 270 },
                        { field: "launchDate", headerName: "Launch Date", width: 170 },
                    ],
                    defaultSort: { field: "launchDate", direction: "desc" },
                }
            }

        );
    }

}
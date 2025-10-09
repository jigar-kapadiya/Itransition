import { errorHandler } from "../middlewares/error";
import { DrugsService } from "../services/drug.service";
import { CompaniesController } from "./company.controller";
import { ConfigController } from "./config.controller";
import { DrugsController } from "./drug.controller";
import { Express } from "express";

export function register(app: Express) {
    const services = [new DrugsService()];
    const controllers = [new DrugsController(services[0]), new ConfigController(), new CompaniesController(services[0])];

    for (const controller of controllers) {
        app.use('/api', controller.router);
    }

    app.use(errorHandler)
}

import { Express } from "express";
import { errorHandler } from "../middlewares/error";
import { UsersController } from "./users.controller";
import { UserService } from "../services/user.service";

export function registerRoutes(app: Express) {
    const services = [new UserService()];
    const controllers = [new UsersController(services[0])];

    for (const controller of controllers) {
        app.use('/api', controller.router);
    }

    app.use(errorHandler)
}
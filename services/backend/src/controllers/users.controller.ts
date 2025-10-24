import { Request, Response, Router } from "express";
import { IController } from "../interfaces/controller.interface";
import { UserService } from "../services/user.service";
import { BadRequestException } from "../utils/http";

export class UsersController implements IController {
    router: Router;
    path: string;

    constructor(private readonly userService: UserService) {
        this.router = Router();
        this.path = '/users';
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/signup`, (req: Request, res: Response) => this.signUp(req, res).catch());
        this.router.post(`${this.path}/verify/:id`, (req: Request, res: Response) => this.verify(req, res).catch());
    }

    async signUp(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || typeof email !== 'string' || !email.length) {
            throw new BadRequestException("Invalid data: Email");
        }
        if (!password || typeof password !== 'string' || !password.length) {
            throw new BadRequestException("Invalid data: Password");
        }
        const newUser = await this.userService.signup(password, email);
        res.status(201).send({ message: "New user added successfully", data: { userId: newUser.id } });
    }

    async verify(req: Request, res: Response) {
        const { otp } = req.body, { id } = req.params;
        if (!otp || typeof otp !== 'string' || !otp.length) {
            throw new BadRequestException("Invalid data: OTP");
        }
        await this.userService.verify(id, otp);
        return res.status(200).send({ message: "User verified successfully" });
    }

}
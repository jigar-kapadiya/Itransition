import { pbkdf2Sync, randomUUID } from "crypto";
import { envVar } from "../../environment";
import { redis } from "../database/redis";
import { prisma } from "../database/sqlite";
import { BadRequestException, ConflictException, NotFoundException } from "../utils/http";
import { UserStatus } from "../../generated/prisma";

export class UserService {

    public async signup(password: any, email: any) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            throw new ConflictException("User already exists")
        }
        const hash = pbkdf2Sync(password, envVar.app.secret, 60, 128, 'sha512').toString();
        const newUser = await prisma.user.create({ data: { email, password: hash } });
        await this.getOTP(newUser.id);
        return newUser;
    }

    private async getOTP(id: string) {
        const otp = randomUUID();
        await redis.set(id, otp, "EX", 60 * 10);
        console.info("OTP for new user", id, "=", otp);  // This can be also sent to email
    }

    public async verify(id: string, otp: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException("No user exists");
        }
        if (user.status === UserStatus.VERIFIED) {
            throw new BadRequestException("User already verified");
        }
        const assignOtp = await redis.get(id);
        if (!assignOtp) {
            throw new NotFoundException("No user exists or OTP time limit reached");
        }
        if (assignOtp !== otp) {
            throw new BadRequestException("Invalid OTP");
        }
        await prisma.user.update({ data: { status: UserStatus.VERIFIED }, where: { id } });
        await redis.del(id);
    }
}
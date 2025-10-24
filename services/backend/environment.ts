import { env } from "process";

export const envVar = {
    redis: {
        host: env.REDIS_HOST || "127.0.0.1",
        port: Number(env.REDIS_PORT ?? 6379),
        password: env.REDIS_PASSWORD,
    },
    app: {
        port: env.PORT || 8000,
        secret: env.SECRET || "app-secret",
    }
}
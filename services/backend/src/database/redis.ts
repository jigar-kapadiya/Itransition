import Redis from "ioredis";
import { envVar } from "../../environment";

export const redis = new Redis({
    host: envVar.redis.host,
    port: envVar.redis.port,
    password: envVar.redis.password,
})

export function connectRedis() {
    redis.connect(() => console.log("Redis connected"))

    redis.on("error", (err) => {
        console.error("Redis connection error:", err);
    });

}

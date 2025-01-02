import Redis, { RedisOptions } from "ioredis";

function getRedisConfiguration(): {
  port: number;
  host: string;
  password: string;
} {
  return {
    port: 9379,
    host: process.env.REDIS_URL ?? "",
    password: process.env.REDIS_KEY ?? "",
  };
}

const redis = createRedisInstance();

export async function getRedisValue(key: string): Promise<string | null> {
  return redis.get(key);
}

export async function setRedisValue(key: string, value: string): Promise<void> {
  redis.set(key, value, "EX", 604800);
}

export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (config.port) {
      options.port = config.port;
    }

    if (config.password) {
      options.password = config.password;
    }

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

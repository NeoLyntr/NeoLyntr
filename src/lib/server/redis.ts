import { Redis } from 'ioredis';
import { REDIS_URL } from '$env/static/private';

export const redis = new Redis(REDIS_URL);

export const redisAdapter = {
  sadd: <TData>(key: string, ...members: TData[]) =>
    redis.sadd(key, ...members.map(m => String(m))),
  eval: async <TArgs extends unknown[], TData = unknown>(
    script: string,
    keys: string[],
    args: TArgs
  ) =>
    redis.eval(
      script,
      keys.length,
      ...keys,
      ...(args ?? []).map(a => String(a))
    ) as Promise<TData>
}

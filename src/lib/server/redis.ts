import { Redis } from 'ioredis';
import { REDIS_URL } from '$env/static/private';

export const redis = new Redis(REDIS_URL);

export const redisAdapter = {
	sadd: <TData>(key: string, ...members: TData[]) =>
		redis.sadd(key, ...members.map((m) => String(m))),

	eval: async <TArgs extends unknown[], TData = unknown>(
		script: string,
		keys: string[],
		args: TArgs
	): Promise<TData> =>
		redis.eval(script, keys.length, ...keys, ...args.map((a) => String(a))) as Promise<TData>,

	hset: <TValue>(key: string, obj: { [key: string]: TValue }) => redis.hset(key, obj),

	evalsha: <TArgs extends unknown[], TData = unknown>(
		sha1: string,
		keys: string[],
		args: TArgs
	): Promise<TData> =>
		redis.evalsha(sha1, keys.length, ...keys, ...args.map((a) => String(a))) as Promise<TData>,

	scriptLoad: (script: string): Promise<string> => redis.script('LOAD', script),

	smismember: (key: string, members: string[]): Promise<0 | 1> => redis.smismember(key, members),

	multi: () => redis.multi()
};

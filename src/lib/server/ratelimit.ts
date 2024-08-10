import { Ratelimit } from '@upstash/ratelimit';
import { redisAdapter } from '@/server/redis';

// 5 request per 5 seconds
export const normalRatelimit = new Ratelimit({
	redis: redisAdapter,
	limiter: Ratelimit.slidingWindow(5, '5 s'),
	analytics: false
});

// 1 request per 15 seconds
export const sensitiveRatelimit = new Ratelimit({
	redis: redisAdapter,
	limiter: Ratelimit.slidingWindow(1, '15 s'),
	analytics: false
});

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisOptions = {
  host: "RedisCodigoTatsoft.redis.cache.windows.net",
  port: 6380,
  password: process.env.REDIS_PASSWORD,
  tls: {
    servername: "RedisCodigoTatsoft.redis.cache.windows.net",
    rejectUnauthorized: false
  },
  retryStrategy: function(times: number) {
    if (times > 3) {
      console.error('Redis retry strategy giving up...');
      return null;
    }
    const delay = Math.min(times * 1000, 3000);
    console.log(`Redis retrying connection in ${delay}ms...`);
    return delay;
  }
};

console.log('Redis configuration:', {
  host: process.env.REDIS_HOST,
  port: 6380,
  hasPassword: !!process.env.REDIS_PASSWORD
});

const redis = new Redis(redisOptions);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redis;
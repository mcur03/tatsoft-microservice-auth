import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL!);

// Guardar un valor en Redis
redis.set("mensaje", "Hola desde Upstash!");

// Obtener un valor de Redis
redis.get("mensaje").then((val) => console.log("Mensaje en Redis:", val));

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on("connect", () => console.log("✅ Conectado a Redis"));
redis.on("error", (err) => console.error("❌ Error en Redis:", err));
redis.on("end", () => console.log("⚠️ Conexión con Redis cerrada"));

export default redis;
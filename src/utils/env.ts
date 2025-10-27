
import 'dotenv/config';
export const env = {
  PORT: Number(process.env.PORT ?? 8080),
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? '*',
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? ''
};

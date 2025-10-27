
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: FRONTEND_ORIGIN === '*' ? true : [FRONTEND_ORIGIN] }));
app.use(rateLimit({ windowMs: 60_000, limit: 120 }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.get('/api/admin/init', async (_req, res) => {
  try {
    await import('./seed.js');
    res.send('✅ Base inicializada con éxito');
  } catch (e) {
    console.error(e);
    res.status(500).send('❌ Error al inicializar la base');
  }
});

app.listen(PORT, () => {
  console.log(`✅ API lista en puerto ${PORT}`);
});

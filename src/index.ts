
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { env } from './utils/env.js';

const prisma = new PrismaClient();
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: env.FRONTEND_ORIGIN === '*' ? true : [env.FRONTEND_ORIGIN] }));
app.use(rateLimit({ windowMs: 60_000, limit: 120 }));

// Routes
app.get('/api/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.get('/api/admin/init', async (_req, res) => {
  try {
    await import('./seed/seed.js');
    res.send('✅ Base inicializada con éxito');
  } catch (e) {
    console.error(e);
    res.status(500).send('❌ Error al inicializar la base');
  }
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`API lista en puerto ${PORT}`);
});

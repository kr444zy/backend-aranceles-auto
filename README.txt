
Backend Aranceles Argentina — Versión automática (Render Free)
Fecha: 2025-10-27

✅ Totalmente lista para Render sin shell ni comandos manuales.
- Crea tablas y datos al visitar /api/admin/init
- Sin tsx, sin dependencias de desarrollo faltantes
- Funciona con Node 22.x y Prisma 5.22+

Instrucciones:
1. Subí este ZIP a GitHub.
2. En Render:
   Build Command: npm install && npm run prisma:generate && npm run prisma:push && npm run build
   Start Command: npm run start
3. Variables de entorno:
   DATABASE_URL, FRONTEND_ORIGIN, (opcional GEMINI_API_KEY)
4. Esperá a que Render diga "Build successful".
5. Entrá en:
   https://TU-BACKEND.onrender.com/api/admin/init
   → Verás "✅ Base inicializada con éxito"
6. Listo para usar:
   /api/health
   /api/aranceles/search (por implementar en frontend)

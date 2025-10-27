
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Iniciando carga de datos...');
  await prisma.note.createMany({
    data: [
      { type: 'gri', title: '1', text: 'Los títulos de las Secciones... sólo tienen valor indicativo.' },
      { type: 'gri', title: '2', text: 'Cualquier referencia a un artículo... alcanzará.' },
      { type: 'gri', title: '3', text: 'Cuando la mercancía pudiera clasificarse en dos o más partidas...' }
    ],
    skipDuplicates: true
  });

  await prisma.nCM.upsert({
    where: { code: '6403.59.90' },
    update: {},
    create: {
      code: '6403.59.90',
      description: 'Calzado con parte superior de cuero natural, los demás',
      section: 'XII',
      chapter: '64',
      heading: '6403',
      subheading: '6403.59',
      unit: 'PAR',
      adValorem: 35.0
    }
  });

  await prisma.nCM.upsert({
    where: { code: '8501.10.10' },
    update: {},
    create: {
      code: '8501.10.10',
      description: 'Motores eléctricos de potencia <= 37.5 W, para ventiladores',
      section: 'XVI',
      chapter: '85',
      heading: '8501',
      subheading: '8501.10',
      unit: 'UN',
      adValorem: 14.0
    }
  });

  const ncm = await prisma.nCM.findUnique({ where: { code: '6403.59.90' } });
  if (ncm) {
    await prisma.note.create({
      data: {
        type: 'nota_explicativa',
        targetCode: ncm.code,
        text: 'Incluye calzado con suela y parte superior de cuero; excluye calzado deportivo con suela de caucho moldeada.',
        ncmId: ncm.id
      }
    });
  }
  console.log('✅ Datos cargados correctamente');
}

main().catch(e => {
  console.error('❌ Error en seed:', e);
}).finally(async () => {
  await prisma.$disconnect();
});

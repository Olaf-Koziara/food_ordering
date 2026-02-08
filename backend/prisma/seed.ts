import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Margherita',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    },
    {
      name: 'Klasyczny Burger',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    },
    {
      name: 'Sałatka Cezara',
      price: 8.49,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Pomyślnie załadowano 3 produkty');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

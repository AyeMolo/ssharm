import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "suraaj",
      name: "Suraaj Nepal",
      email: "suraaj@example.com",
      passwordHash: "test-hash", // just placeholder
    },
  });

  await prisma.post.create({
    data: {
      content: "My first post on my new social media 😈",
      authorId: user.id,
    },
  });

  console.log("Seed complete!");
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
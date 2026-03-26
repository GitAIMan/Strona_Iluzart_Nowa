import { PrismaClient } from "@prisma/client";
import { services } from "../src/shared/data/services";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding services...");

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
        details: service.details,
        imageUrl: service.imageUrl,
        order: service.order,
      },
      create: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        details: service.details,
        imageUrl: service.imageUrl,
        order: service.order,
      },
    });
    console.log(`  ✓ ${service.name}`);
  }

  console.log("\nSeeding sample blog post...");

  await prisma.post.upsert({
    where: { slug: "witaj-na-blogu-iluzart" },
    update: {},
    create: {
      title: "Witaj na blogu IluzArt",
      slug: "witaj-na-blogu-iluzart",
      excerpt:
        "Pierwszy wpis na blogu IluzArt. Dowiedz się więcej o świecie iluzji i magii.",
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Witaj w świecie magii!" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Cieszę się, że tu jesteś! Na tym blogu będę dzielić się z Tobą kulisami mojej pracy, ciekawostkami ze świata iluzji oraz poradami, jak uczynić Twoje wydarzenie niezapomnianym.",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Czego się tutaj dowiesz?" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Jak wybrać idealny pokaz na swoje wydarzenie",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Kulisy pracy iluzjonisty",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Porady dotyczące organizacji eventów z magią",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Zostań na bieżąco i zaglądaj regularnie! Magia dopiero się zaczyna...",
              },
            ],
          },
        ],
      }),
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log("  ✓ Sample blog post created\n");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

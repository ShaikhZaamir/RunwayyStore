import "dotenv/config";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
    // Admin
    await prisma.user.upsert({
        where: { email: "admin@store.com" },
        update: {},
        create: {
            email: "admin@store.com",
            name: "Admin",
            password: "admin123",
            role: "admin",
        },
    });

    // Products
    await prisma.product.createMany({
        data: [
            {
                name: "T-Shirt",
                description: "Comfortable cotton t-shirt",
                price: 99900,
                image: "",
                category: "clothing",
            },
            {
                name: "Sneakers",
                description: "Stylish sneakers",
                price: 299900,
                image: "",
                category: "footwear",
            },
        ],
    });

    console.log("🌱 Seeded successfully");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const growdev = await prisma.user.upsert({
        where: { username: "growdev" },
        update: {},
        create: {
            name: "Growdev",
            username: "growdev",
            password: "12345",
            createdAt: "2025-01-14T21:22:42.586Z",
            updatedAt: "2025-01-14T21:22:42.586Z",
            imgUrl: "https://i.postimg.cc/FF8XWg5L/logo-growdev-Ut-Js-S5.png",
            tweets: {
                create: [],
            },
        },
    });
    const michael = await prisma.user.upsert({
        where: { username: "michael" },
        update: {},
        create: {
            name: "Michael Scott",
            username: "michel_scott",
            password: "12345",
            createdAt: "2025-01-14T22:08:39.662Z",
            updatedAt: "2025-01-14T22:08:39.662Z",
            imgUrl: "https://rollingstone.com.br/media/uploads/2024/03/michael-scott-assassino-trama-bizarra-foi-cortada-de-the-office-foto-reproducaonbc.jpg",
        },
    });
    const ricky = await prisma.user.upsert({
        where: { username: "ricky" },
        update: {},
        create: {
            name: "Ricky",
            username: "ricky",
            password: "12345",
            createdAt: "2025-01-14T22:38:26.269Z",
            updatedAt: "2025-01-14T22:38:26.269Z",
            imgUrl: null,
        },
    });

    await prisma.tweet.upsert({
        where: {
            id: "203f0636-6347-4212-8b65-fe118d739656",
        },
        update: {},
        create: {
            id: "203f0636-6347-4212-8b65-fe118d739656",
            content: "bom dia.",
            type: "N",
            createdAt: "2025-04-28T13:01:49.891Z",
            updatedAt: "2025-04-28T13:01:49.891Z",
            idUser: michael.id,
            likes: {
                create: [
                    {
                        idUser: michael.id,
                        createdAt: "2025-04-28T13:02:06.580Z",
                    },
                ],
            },
        },
    });

    await prisma.tweet.upsert({
        where: {
            id: "1534bf02-1f7e-4388-aad8-f89ffcc537e3",
        },
        update: {},
        create: {
            id: "1534bf02-1f7e-4388-aad8-f89ffcc537e3",
            content: "Teste do desafio Growtwitter",
            type: "N",
            createdAt: "2025-04-20T16:55:37.146Z",
            updatedAt: "2025-04-20T16:55:37.146Z",
            idUser: growdev.id,
            likes: {
                create: [
                    {
                        idUser: michael.id,
                        createdAt: "2025-04-28T13:02:09.190Z",
                    },
                ],
            },
        },
    });

    await prisma.tweet.upsert({
        where: {
            id: "5bcbe3f3-500b-42ae-a84d-566e0c753d65",
        },
        update: {},
        create: {
            id: "5bcbe3f3-500b-42ae-a84d-566e0c753d65",
            content: "Olá, este é o Projeto Full Stack II :)",
            type: "N",
            createdAt: "2025-04-20T14:12:58.349Z",
            updatedAt: "2025-04-20T14:12:58.349Z",
            idUser: growdev.id,
        },
    });

    await prisma.tweet.upsert({
        where: {
            id: "a0733033-a76c-4866-8f30-687fb87f2f22",
        },
        update: {},
        create: {
            id: "a0733033-a76c-4866-8f30-687fb87f2f22",
            content: "Hey! what's up?",
            type: "N",
            createdAt: "2025-04-17T01:13:51.005Z",
            updatedAt: "2025-04-17T01:13:51.005Z",
            idUser: growdev.id,

            likes: {
                create: [
                    {
                        idUser: growdev.id,

                        createdAt: "2025-04-17T01:13:57.716Z",
                    },
                ],
            },
        },
    });

    await prisma.tweet.upsert({
        where: {
            id: "d23366bd-6be3-4d5b-89ad-8b2cdbcc3a25",
        },
        update: {},
        create: {
            id: "d23366bd-6be3-4d5b-89ad-8b2cdbcc3a25",
            content: "teste tweet",
            type: "N",
            createdAt: "2025-04-10T17:47:47.374Z",
            updatedAt: "2025-04-10T17:47:47.374Z",
            idUser: michael.id,
        },
    });
    await prisma.tweet.upsert({
        where: { id: "ce7a4cd1-8adf-4ca2-9414-d82c31e2adb7" },
        update: {},
        create: {
            id: "ce7a4cd1-8adf-4ca2-9414-d82c31e2adb7",
            content: "Opa!",
            type: "N",
            createdAt: "2025-04-10T01:30:19.575Z",
            updatedAt: "2025-04-10T01:30:19.575Z",
            idUser: ricky.id,
        },
    });
    await prisma.tweet.upsert({
        where: { id: "ffed79c1-6b3f-43fb-9d74-b6088f8165ef" },
        update: {},
        create: {
            id: "ffed79c1-6b3f-43fb-9d74-b6088f8165ef",
            content: "testando 123...",
            type: "N",
            createdAt: "2025-04-10T00:24:08.104Z",
            updatedAt: "2025-04-10T00:24:08.104Z",
            idUser: michael.id,
            likes: {
                create: [
                    {
                        idUser: ricky.id,
                        createdAt: "2025-04-10T01:30:49.124Z",
                    },
                ],
            },
        },
    });
    await prisma.tweet.upsert({
        where: { id: "5a1b20b0-5d22-4023-8fe9-c54a62e88850" },
        update: {},
        create: {
            id: "5a1b20b0-5d22-4023-8fe9-c54a62e88850",
            content: "Hello world! Isto é um teste do projeto full stack!",
            type: "N",
            createdAt: "2025-04-09T23:45:51.014Z",
            updatedAt: "2025-04-09T23:45:51.014Z",
            idUser: ricky.id,
            likes: {
                create: [
                    {
                        idUser: michael.id,
                        createdAt: "2025-04-10T00:24:27.368Z",
                    },
                    {
                        idUser: ricky.id,
                        createdAt: "2025-04-10T01:30:43.276Z",
                    },
                ],
            },
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

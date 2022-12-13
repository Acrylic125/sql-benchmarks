import { faker } from "@faker-js/faker";
import prisma from "../db/client";
import batchExecute from "../utils/batch-execute";

function createPost(index: number) {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  };
}

async function getPossibleAuthors() {
  const tasks = await Promise.all([
    prisma.user_with_id.findMany({
      select: { id: true },
      orderBy: {
        id: "asc",
      },
    }),
    prisma.user_with_uuid.findMany({
      select: { id: true },
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  return {
    possibleUsersWithId: tasks[0],
    possibleUsersWithUuid: tasks[1],
  };
}

export default async function seedPosts(posts: number) {
  console.log("Seeding posts");
  const { possibleUsersWithId, possibleUsersWithUuid } = await getPossibleAuthors();
  console.log("Finished getting possible authors");

  await batchExecute({
    batchSize: 500,
    data: Array.from({ length: posts }).map((_, i) => createPost(i)),
    onBeforeBatch: async (batch, batchIndex) => {
      console.log("Seeding Posts Batch #", batchIndex);
    },
    onEachBatch: async (batch, batchIndex) => {
      const random = Math.random();
      const userWithIdIndex = Math.floor(random * possibleUsersWithId.length);
      const userWithUuidIndex = Math.floor(random * possibleUsersWithUuid.length);

      await prisma.$transaction([
        prisma.post_with_user_id.createMany({
          data: batch.map((post) => {
            return {
              author_id: possibleUsersWithId[userWithIdIndex].id,
              ...post,
            };
          }),
        }),
        prisma.post_with_user_uuid.createMany({
          data: batch.map((post) => {
            return {
              author_id: possibleUsersWithUuid[userWithUuidIndex].id,
              ...post,
            };
          }),
        }),
      ]);
    },
    onBatchError: async (error, batch, batchIndex) => {
      console.log("Failed seeding on batch #", batchIndex, error);
    },
  });
  console.log("Posts Seeding Complete!");
}

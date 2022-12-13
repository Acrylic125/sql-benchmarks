import { faker } from "@faker-js/faker";
import prisma from "../db/client";
import batchExecute from "../utils/batch-execute";

function createUser(index: number) {
  const firstName = faker.name.firstName() + "_" + index;
  return {
    email: `${firstName}@gmail.com`,
    username: firstName,
  };
}

export default async function seedUsers(numberOfUsers: number = 500_000) {
  console.log("Seeding users");
  await batchExecute({
    batchSize: 500,
    data: Array.from({ length: numberOfUsers }).map((_, i) => createUser(i)),
    onBeforeBatch: async (batch, batchIndex) => {
      console.log("Seeding Users Batch #", batchIndex);
    },
    onEachBatch: async (batch, batchIndex) => {
      await prisma.$transaction([
        prisma.user_with_id.createMany({
          data: batch,
        }),
        prisma.user_with_uuid.createMany({
          data: batch,
        }),
      ]);
    },
    onBatchError: async (error, batch, batchIndex) => {
      console.log("Failed seeding on batch #", batchIndex, error);
    },
  });
  console.log("User Seeding Complete!");
}

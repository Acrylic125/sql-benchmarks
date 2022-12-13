import prisma from "../db/client";
import batchExecute from "../utils/batch-execute";

async function getPossibleUsersAndPosts() {
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
    prisma.post_with_user_id.findMany({
      select: { id: true },
      orderBy: {
        id: "asc",
      },
    }),
    prisma.post_with_user_uuid.findMany({
      select: { id: true },
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  return {
    possibleUsersWithId: tasks[0],
    possibleUsersWithUuid: tasks[1],
    possiblePostsWithId: tasks[2],
    possiblePostsWithUuid: tasks[3],
  };
}

export default async function seedBookmarks(bookmarks: number) {
  console.log("Seeding bookmarks");
  const { possiblePostsWithId, possiblePostsWithUuid, possibleUsersWithId, possibleUsersWithUuid } = await getPossibleUsersAndPosts();
  console.log("Finished getting possible users and posts");

  await batchExecute({
    batchSize: 1500,
    data: Array.from({ length: bookmarks }).map((_, i) => {
      const random = Math.random();
      const postWithIdIndex = Math.floor(random * possiblePostsWithId.length);
      const userWithIdIndex = Math.floor(random * possibleUsersWithId.length);
      const postWithUuidIndex = Math.floor(random * possiblePostsWithUuid.length);
      const userWithUuidIndex = Math.floor(random * possibleUsersWithUuid.length);

      return {
        post_id: possiblePostsWithId[postWithIdIndex].id,
        post_uuid: possiblePostsWithUuid[postWithUuidIndex].id,
        user_id: possibleUsersWithId[userWithIdIndex].id,
        user_uuid: possibleUsersWithUuid[userWithUuidIndex].id,
      };
    }),
    onBeforeBatch: async (batch, batchIndex) => {
      console.log("Seeding Bookmakrs Batch #", batchIndex);
    },
    onEachBatch: async (batch, batchIndex) => {
      await prisma.$transaction([
        prisma.bookmark_with_user_id.createMany({
          data: batch.map((bookmark) => {
            return {
              user_id: bookmark.user_id,
              post_id: bookmark.post_id,
            };
          }),
        }),
        prisma.bookmark_with_user_uuid.createMany({
          data: batch.map((bookmark) => {
            return {
              user_id: bookmark.user_uuid,
              post_id: bookmark.post_uuid,
            };
          }),
        }),
      ]);
    },
    onBatchError: async (error, batch, batchIndex) => {
      console.log("Failed seeding on batch #", batchIndex, error);
    },
  });
  console.log("Bookmark Seeding Complete!");
}

import benchmark from "../utils/benchmark";
import prisma from "../db/client";

export async function selectAll() {
  const result = benchmark(`SELECT * FROM user_with_id`);
  return result;
}

export async function selectFirstNthUsers(n: number) {
  const result = benchmark(`SELECT * FROM user_with_id LIMIT ${n}`);
  return result;
}

export async function selectLast1000Users(n: number, total: number) {
  const result = benchmark(`SELECT * FROM user_with_id OFFSET ${total - n} LIMIT ${n}`);
  return result;
}

async function getUsersCursorForPage(n: number, page: number) {
  const cursorId = await prisma.user_with_id.findFirst({
    orderBy: {
      id: "asc",
    },
    skip: n * page,
    select: {
      id: true,
    },
  });

  if (cursorId === null) {
    throw new Error("No cursor id found");
  }
  return cursorId;
}

export async function selectPageWithCursor(n: number, page: number) {
  const cursorId = await getUsersCursorForPage(n, page);
  const result = benchmark(`SELECT * FROM user_with_id WHERE id >= ${cursorId.id} LIMIT ${n}`);
  return result;
}

export async function selectPageWithOffset(n: number, page: number) {
  const result = benchmark(`SELECT * FROM user_with_id LIMIT ${n} OFFSET ${n * page}`);
  return result;
}

export async function selectAllUsersWithPosts() {
  const result = benchmark(`SELECT * FROM post_with_user_id p INNER JOIN user_with_id u ON p.author_id = u.id;`);
  return result;
}

async function getBookmarksCursorForPage(n: number, page: number) {
  const cursorId = await prisma.bookmark_with_user_id.findFirst({
    orderBy: {
      id: "asc",
    },
    skip: n * page,
    select: {
      id: true,
    },
  });

  if (cursorId === null) {
    throw new Error("No cursor id found");
  }
  return cursorId;
}

export async function selectPageUserBookmarksWithPostsAndUser(n: number, page: number) {
  const cursorId = await getBookmarksCursorForPage(n, page);
  const result = benchmark(
    `SELECT * FROM bookmark_with_user_id b INNER JOIN post_with_user_id p ON b.post_id = p.id INNER JOIN user_with_id u ON p.author_id = u.id WHERE b.id >= ${cursorId.id} ORDER BY b.id ASC LIMIT ${n}`
  );
  return result;
}

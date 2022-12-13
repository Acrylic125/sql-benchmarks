import seedBookmarks from "./seed/seed-bookmarks";
import seedPosts from "./seed/seed-posts";
import seedUsers from "./seed/seed-users";

async function seed() {
  await seedUsers();
  await seedPosts(500_000);
  await seedBookmarks(1_500_000);
}

seed();

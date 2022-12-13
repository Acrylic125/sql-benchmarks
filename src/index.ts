import * as usersWithId from "./benchmark/user-with-id-benchmarks";
import * as usersWithuuid from "./benchmark/user-with-uuid-benchmarks";
import runBenchmarks from "./utils/run-benchmarks";
import runBenchmarksSeq from "./utils/run-benchmarks-seq";

runBenchmarksSeq([
  {
    tag: "user-with-id: Select All",
    fn: usersWithId.selectAll,
  },
  {
    tag: "user-with-id: Select First Nth Users",
    fn: async () => {
      return usersWithId.selectFirstNthUsers(100);
    },
  },
  {
    tag: "user-with-id: Select Last Nth Users",
    fn: async () => {
      return usersWithId.selectLast1000Users(1000, 499000);
    },
  },
  {
    tag: "user-with-id: Select Page With Cursor",
    fn: async () => {
      return usersWithId.selectPageWithCursor(100, 4200);
    },
  },
  {
    tag: "user-with-id: Select Page With Offset",
    fn: async () => {
      return usersWithId.selectPageWithOffset(100, 420);
    },
  },
  {
    tag: "user-with-id: Select All Users With Posts",
    fn: async () => {
      return usersWithId.selectAllUsersWithPosts();
    },
  },
  {
    tag: "user-with-id: Select Page User Bookmarks With Posts And User",
    fn: async () => {
      return usersWithId.selectPageUserBookmarksWithPostsAndUser(100, 420);
    },
  },
  {
    tag: "user-with-uuid: Select All",
    fn: usersWithuuid.selectAll,
  },
  {
    tag: "user-with-uuid: Select First Nth Users",
    fn: async () => {
      return usersWithuuid.selectFirstNthUsers(100);
    },
  },
  {
    tag: "user-with-uuid: Select Last Nth Users",
    fn: async () => {
      return usersWithuuid.selectLast1000Users(1000, 499000);
    },
  },
  {
    tag: "user-with-uuid: Select Page With Cursor",
    fn: async () => {
      return usersWithuuid.selectPageWithCursor(100, 4200);
    },
  },
  {
    tag: "user-with-uuid: Select Page With Offset",
    fn: async () => {
      return usersWithuuid.selectPageWithOffset(100, 420);
    },
  },
  {
    tag: "user-with-uuid: Select All Users With Posts",
    fn: async () => {
      return usersWithuuid.selectAllUsersWithPosts();
    },
  },
  {
    tag: "user-with-uuid: Select Page User Bookmarks With Posts And User With Cursor",
    fn: async () => {
      return usersWithuuid.selectPageUserBookmarksWithPostsAndUser(100, 420);
    },
  },
]);

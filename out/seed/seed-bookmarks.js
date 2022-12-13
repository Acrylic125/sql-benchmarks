"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../db/client"));
const batch_execute_1 = __importDefault(require("../utils/batch-execute"));
async function getPossibleUsersAndPosts() {
    const tasks = await Promise.all([
        client_1.default.user_with_id.findMany({
            select: { id: true },
            orderBy: {
                id: "asc",
            },
        }),
        client_1.default.user_with_uuid.findMany({
            select: { id: true },
            orderBy: {
                id: "asc",
            },
        }),
        client_1.default.post_with_user_id.findMany({
            select: { id: true },
            orderBy: {
                id: "asc",
            },
        }),
        client_1.default.post_with_user_uuid.findMany({
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
async function seedBookmarks(bookmarks) {
    console.log("Seeding bookmarks");
    const { possiblePostsWithId, possiblePostsWithUuid, possibleUsersWithId, possibleUsersWithUuid } = await getPossibleUsersAndPosts();
    console.log("Finished getting possible users and posts");
    await (0, batch_execute_1.default)({
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
            await client_1.default.$transaction([
                client_1.default.bookmark_with_user_id.createMany({
                    data: batch.map((bookmark) => {
                        return {
                            user_id: bookmark.user_id,
                            post_id: bookmark.post_id,
                        };
                    }),
                }),
                client_1.default.bookmark_with_user_uuid.createMany({
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
exports.default = seedBookmarks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1ib29rbWFya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VlZC9zZWVkLWJvb2ttYXJrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUFrQztBQUNsQywyRUFBa0Q7QUFFbEQsS0FBSyxVQUFVLHdCQUF3QjtJQUNyQyxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDOUIsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQzNCLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7U0FDRixDQUFDO1FBQ0YsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7U0FDRixDQUFDO1FBQ0YsZ0JBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7WUFDaEMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRTtZQUNwQixPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLEtBQUs7YUFDVjtTQUNGLENBQUM7UUFDRixnQkFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztZQUNsQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFO1lBQ3BCLE9BQU8sRUFBRTtnQkFDUCxFQUFFLEVBQUUsS0FBSzthQUNWO1NBQ0YsQ0FBQztLQUNILENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdCLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0IsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3QixxQkFBcUIsRUFB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Q0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFqREQsZ0NBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vZGIvY2xpZW50XCI7XG5pbXBvcnQgYmF0Y2hFeGVjdXRlIGZyb20gXCIuLi91dGlscy9iYXRjaC1leGVjdXRlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBvc3NpYmxlVXNlcnNBbmRQb3N0cygpIHtcbiAgY29uc3QgdGFza3MgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgcHJpc21hLnVzZXJfd2l0aF9pZC5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHByaXNtYS51c2VyX3dpdGhfdXVpZC5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHByaXNtYS5wb3N0X3dpdGhfdXNlcl9pZC5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHByaXNtYS5wb3N0X3dpdGhfdXNlcl91dWlkLmZpbmRNYW55KHtcbiAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICBpZDogXCJhc2NcIixcbiAgICAgIH0sXG4gICAgfSksXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgcG9zc2libGVVc2Vyc1dpdGhJZDogdGFza3NbMF0sXG4gICAgcG9zc2libGVVc2Vyc1dpdGhVdWlkOiB0YXNrc1sxXSxcbiAgICBwb3NzaWJsZVBvc3RzV2l0aElkOiB0YXNrc1syXSxcbiAgICBwb3NzaWJsZVBvc3RzV2l0aFV1aWQ6IHRhc2tzWzNdLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzZWVkQm9va21hcmtzKGJvb2ttYXJrczogbnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKFwiU2VlZGluZyBib29rbWFya3NcIik7XG4gIGNvbnN0IHsgcG9zc2libGVQb3N0c1dpdGhJZCwgcG9zc2libGVQb3N0c1dpdGhVdWlkLCBwb3NzaWJsZVVzZXJzV2l0aElkLCBwb3NzaWJsZVVzZXJzV2l0aFV1aWQgfSA9IGF3YWl0IGdldFBvc3NpYmxlVXNlcnNBbmRQb3N0cygpO1xuICBjb25zb2xlLmxvZyhcIkZpbmlzaGVkIGdldHRpbmcgcG9zc2libGUgdXNlcnMgYW5kIHBvc3RzXCIpO1xuXG4gIGF3YWl0IGJhdGNoRXhlY3V0ZSh7XG4gICAgYmF0Y2hTaXplOiAxNTAwLFxuICAgIGRhdGE6IEFycmF5LmZyb20oeyBsZW5ndGg6IGJvb2ttYXJrcyB9KS5tYXAoKF8sIGkpID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBwb3N0V2l0aElkSW5kZXggPSBNYXRoLmZsb29yKHJhbmRvbSAqIHBvc3NpYmxlUG9zdHNXaXRoSWQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHVzZXJXaXRoSWRJbmRleCA9IE1hdGguZmxvb3IocmFuZG9tICogcG9zc2libGVVc2Vyc1dpdGhJZC5sZW5ndGgpO1xuICAgICAgY29uc3QgcG9zdFdpdGhVdWlkSW5kZXggPSBNYXRoLmZsb29yKHJhbmRvbSAqIHBvc3NpYmxlUG9zdHNXaXRoVXVpZC5sZW5ndGgpO1xuICAgICAgY29uc3QgdXNlcldpdGhVdWlkSW5kZXggPSBNYXRoLmZsb29yKHJhbmRvbSAqIHBvc3NpYmxlVXNlcnNXaXRoVXVpZC5sZW5ndGgpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb3N0X2lkOiBwb3NzaWJsZVBvc3RzV2l0aElkW3Bvc3RXaXRoSWRJbmRleF0uaWQsXG4gICAgICAgIHBvc3RfdXVpZDogcG9zc2libGVQb3N0c1dpdGhVdWlkW3Bvc3RXaXRoVXVpZEluZGV4XS5pZCxcbiAgICAgICAgdXNlcl9pZDogcG9zc2libGVVc2Vyc1dpdGhJZFt1c2VyV2l0aElkSW5kZXhdLmlkLFxuICAgICAgICB1c2VyX3V1aWQ6IHBvc3NpYmxlVXNlcnNXaXRoVXVpZFt1c2VyV2l0aFV1aWRJbmRleF0uaWQsXG4gICAgICB9O1xuICAgIH0pLFxuICAgIG9uQmVmb3JlQmF0Y2g6IGFzeW5jIChiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJTZWVkaW5nIEJvb2ttYWtycyBCYXRjaCAjXCIsIGJhdGNoSW5kZXgpO1xuICAgIH0sXG4gICAgb25FYWNoQmF0Y2g6IGFzeW5jIChiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihbXG4gICAgICAgIHByaXNtYS5ib29rbWFya193aXRoX3VzZXJfaWQuY3JlYXRlTWFueSh7XG4gICAgICAgICAgZGF0YTogYmF0Y2gubWFwKChib29rbWFyaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogYm9va21hcmsudXNlcl9pZCxcbiAgICAgICAgICAgICAgcG9zdF9pZDogYm9va21hcmsucG9zdF9pZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgICBwcmlzbWEuYm9va21hcmtfd2l0aF91c2VyX3V1aWQuY3JlYXRlTWFueSh7XG4gICAgICAgICAgZGF0YTogYmF0Y2gubWFwKChib29rbWFyaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogYm9va21hcmsudXNlcl91dWlkLFxuICAgICAgICAgICAgICBwb3N0X2lkOiBib29rbWFyay5wb3N0X3V1aWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pLFxuICAgICAgICB9KSxcbiAgICAgIF0pO1xuICAgIH0sXG4gICAgb25CYXRjaEVycm9yOiBhc3luYyAoZXJyb3IsIGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCBzZWVkaW5nIG9uIGJhdGNoICNcIiwgYmF0Y2hJbmRleCwgZXJyb3IpO1xuICAgIH0sXG4gIH0pO1xuICBjb25zb2xlLmxvZyhcIkJvb2ttYXJrIFNlZWRpbmcgQ29tcGxldGUhXCIpO1xufVxuIl19
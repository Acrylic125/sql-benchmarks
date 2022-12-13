"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../db/client"));
const batch_execute_1 = __importDefault(require("../utils/batch-execute"));
function createPost(index) {
    return {
        title: faker_1.faker.lorem.sentence(),
        content: faker_1.faker.lorem.paragraphs(),
    };
}
async function getPossibleAuthors() {
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
    ]);
    return {
        possibleUsersWithId: tasks[0],
        possibleUsersWithUuid: tasks[1],
    };
}
async function seedPosts(posts) {
    console.log("Seeding posts");
    const { possibleUsersWithId, possibleUsersWithUuid } = await getPossibleAuthors();
    console.log("Finished getting possible authors");
    await (0, batch_execute_1.default)({
        batchSize: 500,
        data: Array.from({ length: posts }).map((_, i) => createPost(i)),
        onBeforeBatch: async (batch, batchIndex) => {
            console.log("Seeding Posts Batch #", batchIndex);
        },
        onEachBatch: async (batch, batchIndex) => {
            const random = Math.random();
            const userWithIdIndex = Math.floor(random * possibleUsersWithId.length);
            const userWithUuidIndex = Math.floor(random * possibleUsersWithUuid.length);
            await client_1.default.$transaction([
                client_1.default.post_with_user_id.createMany({
                    data: batch.map((post) => {
                        return {
                            author_id: possibleUsersWithId[userWithIdIndex].id,
                            ...post,
                        };
                    }),
                }),
                client_1.default.post_with_user_uuid.createMany({
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
exports.default = seedPosts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1wb3N0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZWVkL3NlZWQtcG9zdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsMERBQWtDO0FBQ2xDLDJFQUFrRDtBQUVsRCxTQUFTLFVBQVUsQ0FBQyxLQUFhO0lBQy9CLE9BQU87UUFDTCxLQUFLLEVBQUUsYUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxFQUFFLGFBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0tBQ2xDLENBQUM7QUFDSixDQUFDO0FBRUQsS0FBSyxVQUFVLGtCQUFrQjtJQUMvQixNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDOUIsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQzNCLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7U0FDRixDQUFDO1FBQ0YsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1lBQzdCLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7U0FDRixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsT0FBTztRQUNMLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNoQyxDQUFDO0FBQ0osQ0FBQztBQUVjLEtBQUssVUFBVSxTQUFTLENBQUMsS0FBYTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSxHQUFHLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQztJQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFFakQsTUFBTSxJQUFBLHVCQUFZLEVBQUM7UUFDakIsU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDN0IsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU1RSxNQUFNLGdCQUFNLENBQUMsWUFBWSxDQUFDO2dCQUN4QixnQkFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztvQkFDbEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDdkIsT0FBTzs0QkFDTCxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRTs0QkFDbEQsR0FBRyxJQUFJO3lCQUNSLENBQUM7b0JBQ0osQ0FBQyxDQUFDO2lCQUNILENBQUM7Z0JBQ0YsZ0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7b0JBQ3BDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ3ZCLE9BQU87NEJBQ0wsU0FBUyxFQUFFLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRTs0QkFDdEQsR0FBRyxJQUFJO3lCQUNSLENBQUM7b0JBQ0osQ0FBQyxDQUFDO2lCQUNILENBQUM7YUFDSCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlELENBQUM7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDekMsQ0FBQztBQXhDRCw0QkF3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYWtlciB9IGZyb20gXCJAZmFrZXItanMvZmFrZXJcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uL2RiL2NsaWVudFwiO1xuaW1wb3J0IGJhdGNoRXhlY3V0ZSBmcm9tIFwiLi4vdXRpbHMvYmF0Y2gtZXhlY3V0ZVwiO1xuXG5mdW5jdGlvbiBjcmVhdGVQb3N0KGluZGV4OiBudW1iZXIpIHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogZmFrZXIubG9yZW0uc2VudGVuY2UoKSxcbiAgICBjb250ZW50OiBmYWtlci5sb3JlbS5wYXJhZ3JhcGhzKCksXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBvc3NpYmxlQXV0aG9ycygpIHtcbiAgY29uc3QgdGFza3MgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgcHJpc21hLnVzZXJfd2l0aF9pZC5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHByaXNtYS51c2VyX3dpdGhfdXVpZC5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgICB9LFxuICAgIH0pLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIHBvc3NpYmxlVXNlcnNXaXRoSWQ6IHRhc2tzWzBdLFxuICAgIHBvc3NpYmxlVXNlcnNXaXRoVXVpZDogdGFza3NbMV0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNlZWRQb3N0cyhwb3N0czogbnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKFwiU2VlZGluZyBwb3N0c1wiKTtcbiAgY29uc3QgeyBwb3NzaWJsZVVzZXJzV2l0aElkLCBwb3NzaWJsZVVzZXJzV2l0aFV1aWQgfSA9IGF3YWl0IGdldFBvc3NpYmxlQXV0aG9ycygpO1xuICBjb25zb2xlLmxvZyhcIkZpbmlzaGVkIGdldHRpbmcgcG9zc2libGUgYXV0aG9yc1wiKTtcblxuICBhd2FpdCBiYXRjaEV4ZWN1dGUoe1xuICAgIGJhdGNoU2l6ZTogNTAwLFxuICAgIGRhdGE6IEFycmF5LmZyb20oeyBsZW5ndGg6IHBvc3RzIH0pLm1hcCgoXywgaSkgPT4gY3JlYXRlUG9zdChpKSksXG4gICAgb25CZWZvcmVCYXRjaDogYXN5bmMgKGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlZWRpbmcgUG9zdHMgQmF0Y2ggI1wiLCBiYXRjaEluZGV4KTtcbiAgICB9LFxuICAgIG9uRWFjaEJhdGNoOiBhc3luYyAoYmF0Y2gsIGJhdGNoSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCB1c2VyV2l0aElkSW5kZXggPSBNYXRoLmZsb29yKHJhbmRvbSAqIHBvc3NpYmxlVXNlcnNXaXRoSWQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHVzZXJXaXRoVXVpZEluZGV4ID0gTWF0aC5mbG9vcihyYW5kb20gKiBwb3NzaWJsZVVzZXJzV2l0aFV1aWQubGVuZ3RoKTtcblxuICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihbXG4gICAgICAgIHByaXNtYS5wb3N0X3dpdGhfdXNlcl9pZC5jcmVhdGVNYW55KHtcbiAgICAgICAgICBkYXRhOiBiYXRjaC5tYXAoKHBvc3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGF1dGhvcl9pZDogcG9zc2libGVVc2Vyc1dpdGhJZFt1c2VyV2l0aElkSW5kZXhdLmlkLFxuICAgICAgICAgICAgICAuLi5wb3N0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICAgIHByaXNtYS5wb3N0X3dpdGhfdXNlcl91dWlkLmNyZWF0ZU1hbnkoe1xuICAgICAgICAgIGRhdGE6IGJhdGNoLm1hcCgocG9zdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgYXV0aG9yX2lkOiBwb3NzaWJsZVVzZXJzV2l0aFV1aWRbdXNlcldpdGhVdWlkSW5kZXhdLmlkLFxuICAgICAgICAgICAgICAuLi5wb3N0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICBdKTtcbiAgICB9LFxuICAgIG9uQmF0Y2hFcnJvcjogYXN5bmMgKGVycm9yLCBiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgc2VlZGluZyBvbiBiYXRjaCAjXCIsIGJhdGNoSW5kZXgsIGVycm9yKTtcbiAgICB9LFxuICB9KTtcbiAgY29uc29sZS5sb2coXCJQb3N0cyBTZWVkaW5nIENvbXBsZXRlIVwiKTtcbn1cbiJdfQ==
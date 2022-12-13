"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../db/client"));
const batch_execute_1 = __importDefault(require("../utils/batch-execute"));
function deleteAll() {
    return Promise.all([client_1.default.posts_with_user_id.deleteMany(), client_1.default.posts_with_user_uuid.deleteMany()]);
}
function createPost(index) {
    return {
        title: faker_1.faker.lorem.sentence(),
        content: faker_1.faker.lorem.paragraphs(),
    };
}
async function getPossibleAuthors(userIndices) {
    const tasks = await Promise.all(userIndices.map(async (userIndex) => {
        const possibleUsersWithId = await client_1.default.user_with_id.findMany({
            select: { id: true },
            orderBy: {
                id: "asc",
            },
            skip: userIndex,
            take: 1,
        });
        const possibleUsersWithUuid = await client_1.default.user_with_uuid.findMany({
            select: { id: true },
            orderBy: {
                id: "asc",
            },
            skip: userIndex,
            take: 1,
        });
        return { possibleUsersWithId, possibleUsersWithUuid };
    }));
    return tasks.reduce((a, b) => {
        return {
            possibleUsersWithId: [...a.possibleUsersWithId, ...b.possibleUsersWithId],
            possibleUsersWithUuid: [...a.possibleUsersWithUuid, ...b.possibleUsersWithUuid],
        };
    }, {
        possibleUsersWithId: [],
        possibleUsersWithUuid: [],
    });
}
async function seedPosts() {
    await deleteAll();
    const a = 1000;
    const b = 500;
    const possibleAuthors = await getPossibleAuthors(Array.from({ length: a }).map((_, i) => i * b));
    console.log("Finished getting possible authors");
    await (0, batch_execute_1.default)({
        batchSize: 500,
        data: Array.from({ length: 25000 }).map((_, i) => createPost(i)),
        onBeforeBatch: async (batch, batchIndex) => {
            console.log("onBeforeBatch", batchIndex);
        },
        onEachBatch: async (batch, batchIndex) => {
            await client_1.default.$transaction([
                client_1.default.posts_with_user_id.createMany({
                    data: batch.map((post) => {
                        return {
                            author_id: possibleAuthors.possibleUsersWithId[batchIndex % possibleAuthors.possibleUsersWithId.length].id,
                            ...post,
                        };
                    }),
                }),
                client_1.default.posts_with_user_uuid.createMany({
                    data: batch.map((post) => {
                        return {
                            author_id: possibleAuthors.possibleUsersWithUuid[batchIndex % possibleAuthors.possibleUsersWithUuid.length].id,
                            ...post,
                        };
                    }),
                }),
            ]);
        },
        onBatchSuccess: async (batch, batchIndex) => {
            console.log("onBatchSuccess", batchIndex);
        },
        onBatchError: async (error, batch, batchIndex) => {
            console.log("error", error);
        },
    });
    console.log("done");
}
exports.default = seedPosts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1wb3N0cyBjb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlZWQvc2VlZC1wb3N0cyBjb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkNBQXdDO0FBQ3hDLDBEQUFrQztBQUNsQywyRUFBa0Q7QUFFbEQsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEVBQUUsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekcsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQWE7SUFDL0IsT0FBTztRQUNMLEtBQUssRUFBRSxhQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUM3QixPQUFPLEVBQUUsYUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7S0FDbEMsQ0FBQztBQUNKLENBQUM7QUFFRCxLQUFLLFVBQVUsa0JBQWtCLENBQUMsV0FBcUI7SUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUM3QixXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtRQUNsQyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQzdELE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7WUFDRCxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLGdCQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztZQUNqRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFO1lBQ3BCLE9BQU8s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QVUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQXpDRCw0QkF5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYWtlciB9IGZyb20gXCJAZmFrZXItanMvZmFrZXJcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uL2RiL2NsaWVudFwiO1xuaW1wb3J0IGJhdGNoRXhlY3V0ZSBmcm9tIFwiLi4vdXRpbHMvYmF0Y2gtZXhlY3V0ZVwiO1xuXG5mdW5jdGlvbiBkZWxldGVBbGwoKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChbcHJpc21hLnBvc3RzX3dpdGhfdXNlcl9pZC5kZWxldGVNYW55KCksIHByaXNtYS5wb3N0c193aXRoX3VzZXJfdXVpZC5kZWxldGVNYW55KCldKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUG9zdChpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IGZha2VyLmxvcmVtLnNlbnRlbmNlKCksXG4gICAgY29udGVudDogZmFrZXIubG9yZW0ucGFyYWdyYXBocygpLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQb3NzaWJsZUF1dGhvcnModXNlckluZGljZXM6IG51bWJlcltdKSB7XG4gIGNvbnN0IHRhc2tzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgdXNlckluZGljZXMubWFwKGFzeW5jICh1c2VySW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHBvc3NpYmxlVXNlcnNXaXRoSWQgPSBhd2FpdCBwcmlzbWEudXNlcl93aXRoX2lkLmZpbmRNYW55KHtcbiAgICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBpZDogXCJhc2NcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2tpcDogdXNlckluZGV4LFxuICAgICAgICB0YWtlOiAxLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBwb3NzaWJsZVVzZXJzV2l0aFV1aWQgPSBhd2FpdCBwcmlzbWEudXNlcl93aXRoX3V1aWQuZmluZE1hbnkoe1xuICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcbiAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgIGlkOiBcImFzY1wiLFxuICAgICAgICB9LFxuICAgICAgICBza2lwOiB1c2VySW5kZXgsXG4gICAgICAgIHRha2U6IDEsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7IHBvc3NpYmxlVXNlcnNXaXRoSWQsIHBvc3NpYmxlVXNlcnNXaXRoVXVpZCB9O1xuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHRhc2tzLnJlZHVjZShcbiAgICAoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcG9zc2libGVVc2Vyc1dpdGhJZDogWy4uLmEucG9zc2libGVVc2Vyc1dpdGhJZCwgLi4uYi5wb3NzaWJsZVVzZXJzV2l0aElkXSxcbiAgICAgICAgcG9zc2libGVVc2Vyc1dpdGhVdWlkOiBbLi4uYS5wb3NzaWJsZVVzZXJzV2l0aFV1aWQsIC4uLmIucG9zc2libGVVc2Vyc1dpdGhVdWlkXSxcbiAgICAgIH07XG4gICAgfSxcbiAgICB7XG4gICAgICBwb3NzaWJsZVVzZXJzV2l0aElkOiBbXSxcbiAgICAgIHBvc3NpYmxlVXNlcnNXaXRoVXVpZDogW10sXG4gICAgfVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzZWVkUG9zdHMoKSB7XG4gIGF3YWl0IGRlbGV0ZUFsbCgpO1xuICBjb25zdCBhID0gMV8wMDA7XG4gIGNvbnN0IGIgPSA1MDA7XG4gIGNvbnN0IHBvc3NpYmxlQXV0aG9ycyA9IGF3YWl0IGdldFBvc3NpYmxlQXV0aG9ycyhBcnJheS5mcm9tKHsgbGVuZ3RoOiBhIH0pLm1hcCgoXywgaSkgPT4gaSAqIGIpKTtcbiAgY29uc29sZS5sb2coXCJGaW5pc2hlZCBnZXR0aW5nIHBvc3NpYmxlIGF1dGhvcnNcIik7XG5cbiAgYXdhaXQgYmF0Y2hFeGVjdXRlKHtcbiAgICBiYXRjaFNpemU6IDUwMCxcbiAgICBkYXRhOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNV8wMDAgfSkubWFwKChfLCBpKSA9PiBjcmVhdGVQb3N0KGkpKSxcbiAgICBvbkJlZm9yZUJhdGNoOiBhc3luYyAoYmF0Y2gsIGJhdGNoSW5kZXgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25CZWZvcmVCYXRjaFwiLCBiYXRjaEluZGV4KTtcbiAgICB9LFxuICAgIG9uRWFjaEJhdGNoOiBhc3luYyAoYmF0Y2gsIGJhdGNoSW5kZXgpID0+IHtcbiAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oW1xuICAgICAgICBwcmlzbWEucG9zdHNfd2l0aF91c2VyX2lkLmNyZWF0ZU1hbnkoe1xuICAgICAgICAgIGRhdGE6IGJhdGNoLm1hcCgocG9zdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgYXV0aG9yX2lkOiBwb3NzaWJsZUF1dGhvcnMucG9zc2libGVVc2Vyc1dpdGhJZFtiYXRjaEluZGV4ICUgcG9zc2libGVBdXRob3JzLnBvc3NpYmxlVXNlcnNXaXRoSWQubGVuZ3RoXS5pZCxcbiAgICAgICAgICAgICAgLi4ucG9zdCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgICBwcmlzbWEucG9zdHNfd2l0aF91c2VyX3V1aWQuY3JlYXRlTWFueSh7XG4gICAgICAgICAgZGF0YTogYmF0Y2gubWFwKChwb3N0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBhdXRob3JfaWQ6IHBvc3NpYmxlQXV0aG9ycy5wb3NzaWJsZVVzZXJzV2l0aFV1aWRbYmF0Y2hJbmRleCAlIHBvc3NpYmxlQXV0aG9ycy5wb3NzaWJsZVVzZXJzV2l0aFV1aWQubGVuZ3RoXS5pZCxcbiAgICAgICAgICAgICAgLi4ucG9zdCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgXSk7XG4gICAgfSxcbiAgICBvbkJhdGNoU3VjY2VzczogYXN5bmMgKGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uQmF0Y2hTdWNjZXNzXCIsIGJhdGNoSW5kZXgpO1xuICAgIH0sXG4gICAgb25CYXRjaEVycm9yOiBhc3luYyAoZXJyb3IsIGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKTtcbiAgICB9LFxuICB9KTtcbiAgY29uc29sZS5sb2coXCJkb25lXCIpO1xufVxuIl19
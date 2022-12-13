"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../db/client"));
const batch_execute_1 = __importDefault(require("../utils/batch-execute"));
function createUser(index) {
    const firstName = faker_1.faker.name.firstName() + "_" + index;
    return {
        email: `${firstName}@gmail.com`,
        username: firstName,
    };
}
async function seedUsers(numberOfUsers = 500000) {
    console.log("Seeding users");
    await (0, batch_execute_1.default)({
        batchSize: 500,
        data: Array.from({ length: numberOfUsers }).map((_, i) => createUser(i)),
        onBeforeBatch: async (batch, batchIndex) => {
            console.log("Seeding Users Batch #", batchIndex);
        },
        onEachBatch: async (batch, batchIndex) => {
            await client_1.default.$transaction([
                client_1.default.user_with_id.createMany({
                    data: batch,
                }),
                client_1.default.user_with_uuid.createMany({
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
exports.default = seedUsers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC11c2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZWVkL3NlZWQtdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsMERBQWtDO0FBQ2xDLDJFQUFrRDtBQUVsRCxTQUFTLFVBQVUsQ0FBQyxLQUFhO0lBQy9CLE1BQU0sU0FBUyxHQUFHLGFBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUN2RCxPQUFPO1FBQ0wsS0FBSyxFQUFFLEdBQUcsU0FBUyxZQUFZO1FBQy9CLFFBQVEsRUFBRSxTQUFTO0tBQ3BCLENBQUM7QUFDSixDQUFDO0FBRWMsS0FBSyxVQUFVLFNBQVMsQ0FBQyxnQkFBd0IsTUFBTztJQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sSUFBQSx1QkFBWSxFQUFDO1FBQ2pCLFNBQVMsRUFBRSxHQUFHO1FBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDdkMsTUFBTSxnQkFBTSxDQUFDLFlBQVksQ0FBQztnQkFDeEIsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO29CQUM3QixJQUFJLEVBQUUsS0FBSztpQkFDWixDQUFDO2dCQUNGLGdCQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztvQkFDL0IsSUFBSSxFQUFFLEtBQUs7aUJBQ1osQ0FBQzthQUNILENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBdkJELDRCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZha2VyIH0gZnJvbSBcIkBmYWtlci1qcy9mYWtlclwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vZGIvY2xpZW50XCI7XG5pbXBvcnQgYmF0Y2hFeGVjdXRlIGZyb20gXCIuLi91dGlscy9iYXRjaC1leGVjdXRlXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXIoaW5kZXg6IG51bWJlcikge1xuICBjb25zdCBmaXJzdE5hbWUgPSBmYWtlci5uYW1lLmZpcnN0TmFtZSgpICsgXCJfXCIgKyBpbmRleDtcbiAgcmV0dXJuIHtcbiAgICBlbWFpbDogYCR7Zmlyc3ROYW1lfUBnbWFpbC5jb21gLFxuICAgIHVzZXJuYW1lOiBmaXJzdE5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNlZWRVc2VycyhudW1iZXJPZlVzZXJzOiBudW1iZXIgPSA1MDBfMDAwKSB7XG4gIGNvbnNvbGUubG9nKFwiU2VlZGluZyB1c2Vyc1wiKTtcbiAgYXdhaXQgYmF0Y2hFeGVjdXRlKHtcbiAgICBiYXRjaFNpemU6IDUwMCxcbiAgICBkYXRhOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1iZXJPZlVzZXJzIH0pLm1hcCgoXywgaSkgPT4gY3JlYXRlVXNlcihpKSksXG4gICAgb25CZWZvcmVCYXRjaDogYXN5bmMgKGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlZWRpbmcgVXNlcnMgQmF0Y2ggI1wiLCBiYXRjaEluZGV4KTtcbiAgICB9LFxuICAgIG9uRWFjaEJhdGNoOiBhc3luYyAoYmF0Y2gsIGJhdGNoSW5kZXgpID0+IHtcbiAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oW1xuICAgICAgICBwcmlzbWEudXNlcl93aXRoX2lkLmNyZWF0ZU1hbnkoe1xuICAgICAgICAgIGRhdGE6IGJhdGNoLFxuICAgICAgICB9KSxcbiAgICAgICAgcHJpc21hLnVzZXJfd2l0aF91dWlkLmNyZWF0ZU1hbnkoe1xuICAgICAgICAgIGRhdGE6IGJhdGNoLFxuICAgICAgICB9KSxcbiAgICAgIF0pO1xuICAgIH0sXG4gICAgb25CYXRjaEVycm9yOiBhc3luYyAoZXJyb3IsIGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCBzZWVkaW5nIG9uIGJhdGNoICNcIiwgYmF0Y2hJbmRleCwgZXJyb3IpO1xuICAgIH0sXG4gIH0pO1xuICBjb25zb2xlLmxvZyhcIlVzZXIgU2VlZGluZyBDb21wbGV0ZSFcIik7XG59XG4iXX0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../db/client"));
const batch_execute_1 = __importDefault(require("../utils/batch-execute"));
function deleteAll() {
    return Promise.all([client_1.default.user_with_id.deleteMany(), client_1.default.user_with_uuid.deleteMany()]);
}
function createUser(index) {
    const firstName = faker_1.faker.name.firstName() + "_" + index;
    return {
        email: `${firstName}@gmail.com`,
        username: firstName,
    };
}
async function seedUsers() {
    await deleteAll();
    await (0, batch_execute_1.default)({
        batchSize: 500,
        data: Array.from({ length: 500000 }).map((_, i) => createUser(i)),
        onBeforeBatch: async (batch, batchIndex) => {
            console.log("onBeforeBatch", batchIndex);
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
        onBatchSuccess: async (batch, batchIndex) => {
            console.log("onBatchSuccess", batchIndex);
        },
        onBatchError: async (error, batch, batchIndex) => {
            console.log("error", error);
        },
    });
    console.log("done");
}
exports.default = seedUsers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZWVkIGNvcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VlZC91c2VyLXNlZWQgY29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJDQUF3QztBQUN4QywwREFBa0M7QUFDbEMsMkVBQWtEO0FBRWxELFNBQVMsU0FBUztJQUNoQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxnQkFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQWE7SUFDL0IsTUFBTSxTQUFTLEdBQUcsYUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ3ZELE9BQU87UUFDTCxLQUFLLEVBQUUsR0FBRyxTQUFTLFlBQVk7UUFDL0IsUUFBUSxFQUFFLFNBQVM7S0FDcEIsQ0FBQztBQUNKLENBQUM7QUFFYyxLQUFLLFVBQVUsU0FBUztJQUNyQyxNQUFNLFNBQVMsRUFBRSxDQUFDO0lBRWxCLE1BQU0sSUFBQSx1QkFBWSxFQUFDO1FBQ2pCLFNBQVMsRUFBRSxHQUFHO1FBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3hCLGdCQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztvQkFDN0IsSUFBSSxFQUFFLEtBQUs7aUJBQ1osQ0FBQztnQkFDRixnQkFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7b0JBQy9CLElBQUksRUFBRSxLQUFLO2lCQUNaLENBQUM7YUFDSCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUEzQkQsNEJBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmFrZXIgfSBmcm9tIFwiQGZha2VyLWpzL2Zha2VyXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi9kYi9jbGllbnRcIjtcbmltcG9ydCBiYXRjaEV4ZWN1dGUgZnJvbSBcIi4uL3V0aWxzL2JhdGNoLWV4ZWN1dGVcIjtcblxuZnVuY3Rpb24gZGVsZXRlQWxsKCkge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoW3ByaXNtYS51c2VyX3dpdGhfaWQuZGVsZXRlTWFueSgpLCBwcmlzbWEudXNlcl93aXRoX3V1aWQuZGVsZXRlTWFueSgpXSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXIoaW5kZXg6IG51bWJlcikge1xuICBjb25zdCBmaXJzdE5hbWUgPSBmYWtlci5uYW1lLmZpcnN0TmFtZSgpICsgXCJfXCIgKyBpbmRleDtcbiAgcmV0dXJuIHtcbiAgICBlbWFpbDogYCR7Zmlyc3ROYW1lfUBnbWFpbC5jb21gLFxuICAgIHVzZXJuYW1lOiBmaXJzdE5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNlZWRVc2VycygpIHtcbiAgYXdhaXQgZGVsZXRlQWxsKCk7XG4gIC8vICAgYXdhaXQgUHJvbWlzZS5hbnkoY2FsbHMpO1xuICBhd2FpdCBiYXRjaEV4ZWN1dGUoe1xuICAgIGJhdGNoU2l6ZTogNTAwLFxuICAgIGRhdGE6IEFycmF5LmZyb20oeyBsZW5ndGg6IDUwMF8wMDAgfSkubWFwKChfLCBpKSA9PiBjcmVhdGVVc2VyKGkpKSxcbiAgICBvbkJlZm9yZUJhdGNoOiBhc3luYyAoYmF0Y2gsIGJhdGNoSW5kZXgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25CZWZvcmVCYXRjaFwiLCBiYXRjaEluZGV4KTtcbiAgICB9LFxuICAgIG9uRWFjaEJhdGNoOiBhc3luYyAoYmF0Y2gsIGJhdGNoSW5kZXgpID0+IHtcbiAgICAgIGF3YWl0IHByaXNtYS4kdHJhbnNhY3Rpb24oW1xuICAgICAgICBwcmlzbWEudXNlcl93aXRoX2lkLmNyZWF0ZU1hbnkoe1xuICAgICAgICAgIGRhdGE6IGJhdGNoLFxuICAgICAgICB9KSxcbiAgICAgICAgcHJpc21hLnVzZXJfd2l0aF91dWlkLmNyZWF0ZU1hbnkoe1xuICAgICAgICAgIGRhdGE6IGJhdGNoLFxuICAgICAgICB9KSxcbiAgICAgIF0pO1xuICAgIH0sXG4gICAgb25CYXRjaFN1Y2Nlc3M6IGFzeW5jIChiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJvbkJhdGNoU3VjY2Vzc1wiLCBiYXRjaEluZGV4KTtcbiAgICB9LFxuICAgIG9uQmF0Y2hFcnJvcjogYXN5bmMgKGVycm9yLCBiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiLCBlcnJvcik7XG4gICAgfSxcbiAgfSk7XG4gIGNvbnNvbGUubG9nKFwiZG9uZVwiKTtcbn1cbiJdfQ==
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZWVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlZWQvdXNlci1zZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkNBQXdDO0FBQ3hDLDBEQUFrQztBQUNsQywyRUFBa0Q7QUFFbEQsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLGdCQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsS0FBYTtJQUMvQixNQUFNLFNBQVMsR0FBRyxhQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDdkQsT0FBTztRQUNMLEtBQUssRUFBRSxHQUFHLFNBQVMsWUFBWTtRQUMvQixRQUFRLEVBQUUsU0FBUztLQUNwQixDQUFDO0FBQ0osQ0FBQztBQUVjLEtBQUssVUFBVSxTQUFTO0lBQ3JDLE1BQU0sU0FBUyxFQUFFLENBQUM7SUFFbEIsTUFBTSxJQUFBLHVCQUFZLEVBQUM7UUFDakIsU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDdkMsTUFBTSxnQkFBTSxDQUFDLFlBQVksQ0FBQztnQkFDeEIsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO29CQUM3QixJQUFJLEVBQUUsS0FBSztpQkFDWixDQUFDO2dCQUNGLGdCQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztvQkFDL0IsSUFBSSxFQUFFLEtBQUs7aUJBQ1osQ0FBQzthQUNILENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxjQUFjLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQTNCRCw0QkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYWtlciB9IGZyb20gXCJAZmFrZXItanMvZmFrZXJcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uL2RiL2NsaWVudFwiO1xuaW1wb3J0IGJhdGNoRXhlY3V0ZSBmcm9tIFwiLi4vdXRpbHMvYmF0Y2gtZXhlY3V0ZVwiO1xuXG5mdW5jdGlvbiBkZWxldGVBbGwoKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChbcHJpc21hLnVzZXJfd2l0aF9pZC5kZWxldGVNYW55KCksIHByaXNtYS51c2VyX3dpdGhfdXVpZC5kZWxldGVNYW55KCldKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVXNlcihpbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IGZpcnN0TmFtZSA9IGZha2VyLm5hbWUuZmlyc3ROYW1lKCkgKyBcIl9cIiArIGluZGV4O1xuICByZXR1cm4ge1xuICAgIGVtYWlsOiBgJHtmaXJzdE5hbWV9QGdtYWlsLmNvbWAsXG4gICAgdXNlcm5hbWU6IGZpcnN0TmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gc2VlZFVzZXJzKCkge1xuICBhd2FpdCBkZWxldGVBbGwoKTtcbiAgLy8gICBhd2FpdCBQcm9taXNlLmFueShjYWxscyk7XG4gIGF3YWl0IGJhdGNoRXhlY3V0ZSh7XG4gICAgYmF0Y2hTaXplOiA1MDAsXG4gICAgZGF0YTogQXJyYXkuZnJvbSh7IGxlbmd0aDogNTAwXzAwMCB9KS5tYXAoKF8sIGkpID0+IGNyZWF0ZVVzZXIoaSkpLFxuICAgIG9uQmVmb3JlQmF0Y2g6IGFzeW5jIChiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJvbkJlZm9yZUJhdGNoXCIsIGJhdGNoSW5kZXgpO1xuICAgIH0sXG4gICAgb25FYWNoQmF0Y2g6IGFzeW5jIChiYXRjaCwgYmF0Y2hJbmRleCkgPT4ge1xuICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihbXG4gICAgICAgIHByaXNtYS51c2VyX3dpdGhfaWQuY3JlYXRlTWFueSh7XG4gICAgICAgICAgZGF0YTogYmF0Y2gsXG4gICAgICAgIH0pLFxuICAgICAgICBwcmlzbWEudXNlcl93aXRoX3V1aWQuY3JlYXRlTWFueSh7XG4gICAgICAgICAgZGF0YTogYmF0Y2gsXG4gICAgICAgIH0pLFxuICAgICAgXSk7XG4gICAgfSxcbiAgICBvbkJhdGNoU3VjY2VzczogYXN5bmMgKGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uQmF0Y2hTdWNjZXNzXCIsIGJhdGNoSW5kZXgpO1xuICAgIH0sXG4gICAgb25CYXRjaEVycm9yOiBhc3luYyAoZXJyb3IsIGJhdGNoLCBiYXRjaEluZGV4KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKTtcbiAgICB9LFxuICB9KTtcbiAgY29uc29sZS5sb2coXCJkb25lXCIpO1xufVxuIl19
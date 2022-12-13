"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllUserBookmarksWithPostsAndUser = exports.selectAllUsersWithPosts = exports.selectPageWithOffset = exports.selectPageWithCursor = exports.selectLast1000Users = exports.selectFirstNthUsers = exports.selectAll = void 0;
const benchmark_1 = __importDefault(require("../utils/benchmark"));
const client_1 = __importDefault(require("../db/client"));
async function selectAll() {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_id`);
    return result;
}
exports.selectAll = selectAll;
async function selectFirstNthUsers(n) {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_id LIMIT ${n}`);
    return result;
}
exports.selectFirstNthUsers = selectFirstNthUsers;
async function selectLast1000Users(n, total) {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_id OFFSET ${total - n} LIMIT ${n}`);
    return result;
}
exports.selectLast1000Users = selectLast1000Users;
async function selectPageWithCursor(n, page) {
    const cursorId = await client_1.default.user_with_id.findFirst({
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
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_id WHERE id >= ${cursorId.id} LIMIT ${n}`);
    return result;
}
exports.selectPageWithCursor = selectPageWithCursor;
async function selectPageWithOffset(n, page) {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_id LIMIT ${n} OFFSET ${n * page}`);
    return result;
}
exports.selectPageWithOffset = selectPageWithOffset;
async function selectAllUsersWithPosts() {
    const result = (0, benchmark_1.default)(`SELECT * FROM post_with_user_id p INNER JOIN user_with_id u ON p.author_id = u.id;`);
    return result;
}
exports.selectAllUsersWithPosts = selectAllUsersWithPosts;
async function selectAllUserBookmarksWithPostsAndUser(skip, take) {
    const result = (0, benchmark_1.default)(`SELECT * FROM bookmark_with_user_id b INNER JOIN post_with_user_id p ON b.post_id = p.id INNER JOIN user_with_id u ON p.author_id = u.id LIMIT ${take} OFFSET ${skip}`);
    return result;
}
exports.selectAllUserBookmarksWithPostsAndUser = selectAllUserBookmarksWithPostsAndUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13aXRoLWlkLWJlbmNobWFya3MgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iZW5jaG1hcmsvdXNlci13aXRoLWlkLWJlbmNobWFya3MgY29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtRUFBMkM7QUFDM0MsMERBQWtDO0FBRTNCLEtBQUssVUFBVSxTQUFTO0lBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFIRCw4QkFHQztBQUVNLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxDQUFTO0lBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQyxvQ0FBb0MsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRSxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSEQsa0RBR0M7QUFFTSxLQUFLLFVBQVUsbUJBQW1CLENBQUMsQ0FBUyxFQUFFLEtBQWE7SUFDaEUsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLHFDQUFxQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUhELGtEQUdDO0FBRU0sS0FBSyxVQUFVLG9CQUFvQixDQUFDLENBQVMsRUFBRSxJQUFZO0lBQ2hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ25ELE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxLQUFLO1NBQ1Y7UUFDRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUk7UUFDZCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsSUFBSTtTQUNUO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN2QztJQUVELE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQywwQ0FBMEMsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFqQkQsb0RBaUJDO0FBRU0sS0FBSyxVQUFVLG9CQUFvQixDQUFDLENBQVMsRUFBRSxJQUFZO0lBQ2hFLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQyxvQ0FBb0MsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFIRCxvREFHQztBQUVNLEtBQUssVUFBVSx1QkFBdUI7SUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLG9GQUFvRixDQUFDLENBQUM7SUFDL0csT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUhELDBEQUdDO0FBRU0sS0FBSyxVQUFVLHNDQUFzQyxDQUFDLElBQVksRUFBRSxJQUFZO0lBQ3JGLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFDdEIsa0pBQWtKLElBQUksV0FBVyxJQUFJLEVBQUUsQ0FDeEssQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFMRCx3RkFLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW5jaE1hcmsgZnJvbSBcIi4uL3V0aWxzL2JlbmNobWFya1wiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vZGIvY2xpZW50XCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNoTWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfaWRgKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdEZpcnN0TnRoVXNlcnMobjogbnVtYmVyKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNoTWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfaWQgTElNSVQgJHtufWApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0TGFzdDEwMDBVc2VycyhuOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2hNYXJrKGBTRUxFQ1QgKiBGUk9NIHVzZXJfd2l0aF9pZCBPRkZTRVQgJHt0b3RhbCAtIG59IExJTUlUICR7bn1gKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdFBhZ2VXaXRoQ3Vyc29yKG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IGN1cnNvcklkID0gYXdhaXQgcHJpc21hLnVzZXJfd2l0aF9pZC5maW5kRmlyc3Qoe1xuICAgIG9yZGVyQnk6IHtcbiAgICAgIGlkOiBcImFzY1wiLFxuICAgIH0sXG4gICAgc2tpcDogbiAqIHBhZ2UsXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICB9LFxuICB9KTtcblxuICBpZiAoY3Vyc29ySWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjdXJzb3IgaWQgZm91bmRcIik7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBiZW5jaE1hcmsoYFNFTEVDVCAqIEZST00gdXNlcl93aXRoX2lkIFdIRVJFIGlkID49ICR7Y3Vyc29ySWQuaWR9IExJTUlUICR7bn1gKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdFBhZ2VXaXRoT2Zmc2V0KG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNoTWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfaWQgTElNSVQgJHtufSBPRkZTRVQgJHtuICogcGFnZX1gKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdEFsbFVzZXJzV2l0aFBvc3RzKCkge1xuICBjb25zdCByZXN1bHQgPSBiZW5jaE1hcmsoYFNFTEVDVCAqIEZST00gcG9zdF93aXRoX3VzZXJfaWQgcCBJTk5FUiBKT0lOIHVzZXJfd2l0aF9pZCB1IE9OIHAuYXV0aG9yX2lkID0gdS5pZDtgKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdEFsbFVzZXJCb29rbWFya3NXaXRoUG9zdHNBbmRVc2VyKHNraXA6IG51bWJlciwgdGFrZTogbnVtYmVyKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNoTWFyayhcbiAgICBgU0VMRUNUICogRlJPTSBib29rbWFya193aXRoX3VzZXJfaWQgYiBJTk5FUiBKT0lOIHBvc3Rfd2l0aF91c2VyX2lkIHAgT04gYi5wb3N0X2lkID0gcC5pZCBJTk5FUiBKT0lOIHVzZXJfd2l0aF9pZCB1IE9OIHAuYXV0aG9yX2lkID0gdS5pZCBMSU1JVCAke3Rha2V9IE9GRlNFVCAke3NraXB9YFxuICApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuIl19
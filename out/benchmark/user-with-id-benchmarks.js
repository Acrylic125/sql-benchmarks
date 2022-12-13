"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPageUserBookmarksWithPostsAndUser = exports.selectAllUsersWithPosts = exports.selectPageWithOffset = exports.selectPageWithCursor = exports.selectLast1000Users = exports.selectFirstNthUsers = exports.selectAll = void 0;
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
async function getUsersCursorForPage(n, page) {
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
    return cursorId;
}
async function selectPageWithCursor(n, page) {
    const cursorId = await getUsersCursorForPage(n, page);
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
async function getBookmarksCursorForPage(n, page) {
    const cursorId = await client_1.default.bookmark_with_user_id.findFirst({
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
async function selectPageUserBookmarksWithPostsAndUser(n, page) {
    const cursorId = await getBookmarksCursorForPage(n, page);
    const result = (0, benchmark_1.default)(`SELECT * FROM bookmark_with_user_id b INNER JOIN post_with_user_id p ON b.post_id = p.id INNER JOIN user_with_id u ON p.author_id = u.id WHERE b.id >= ${cursorId.id} ORDER BY b.id ASC LIMIT ${n}`);
    return result;
}
exports.selectPageUserBookmarksWithPostsAndUser = selectPageUserBookmarksWithPostsAndUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13aXRoLWlkLWJlbmNobWFya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmVuY2htYXJrL3VzZXItd2l0aC1pZC1iZW5jaG1hcmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1FQUEyQztBQUMzQywwREFBa0M7QUFFM0IsS0FBSyxVQUFVLFNBQVM7SUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDdkQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUhELDhCQUdDO0FBRU0sS0FBSyxVQUFVLG1CQUFtQixDQUFDLENBQVM7SUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLG9DQUFvQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFIRCxrREFHQztBQUVNLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxDQUFTLEVBQUUsS0FBYTtJQUNoRSxNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFTLEVBQUMscUNBQXFDLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSEQsa0RBR0M7QUFFRCxLQUFLLFVBQVUscUJBQXFCLENBQUMsQ0FBUyxFQUFFLElBQVk7SUFDMUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbkQsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEtBQUs7U0FDVjtRQUNELElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSTtRQUNkLE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxJQUFJO1NBQ1Q7S0FDRixDQUFDLENBQUM7SUFFSCxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVNLEtBQUssVUFBVSxvQkFBb0IsQ0FBQyxDQUFTLEVBQUUsSUFBWTtJQUNoRSxNQUFNLFFBQVEsR0FBRyxNQUFNLHFCQUFxQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFTLEVBQUMsMENBQTBDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSkQsb0RBSUM7QUFFTSxLQUFLLFVBQVUsb0JBQW9CLENBQUMsQ0FBUyxFQUFFLElBQVk7SUFDaEUsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLG9DQUFvQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUhELG9EQUdDO0FBRU0sS0FBSyxVQUFVLHVCQUF1QjtJQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFTLEVBQUMsb0ZBQW9GLENBQUMsQ0FBQztJQUMvRyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSEQsMERBR0M7QUFFRCxLQUFLLFVBQVUseUJBQXlCLENBQUMsQ0FBUyxFQUFFLElBQVk7SUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQztRQUM1RCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSztTQUNWO1FBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJO1FBQ2QsTUFBTSxFQUFFO1lBQ04sRUFBRSxFQUFFLElBQUk7U0FDVDtLQUNGLENBQUMsQ0FBQztJQUVILElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDdkM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRU0sS0FBSyxVQUFVLHVDQUF1QyxDQUFDLENBQVMsRUFBRSxJQUFZO0lBQ25GLE1BQU0sUUFBUSxHQUFHLE1BQU0seUJBQXlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFDdEIsMEpBQTBKLFFBQVEsQ0FBQyxFQUFFLDRCQUE0QixDQUFDLEVBQUUsQ0FDck0sQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFORCwwRkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW5jaG1hcmsgZnJvbSBcIi4uL3V0aWxzL2JlbmNobWFya1wiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vZGIvY2xpZW50XCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNobWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfaWRgKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdEZpcnN0TnRoVXNlcnMobjogbnVtYmVyKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNobWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfaWQgTElNSVQgJHtufWApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0TGFzdDEwMDBVc2VycyhuOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKGBTRUxFQ1QgKiBGUk9NIHVzZXJfd2l0aF9pZCBPRkZTRVQgJHt0b3RhbCAtIG59IExJTUlUICR7bn1gKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlcnNDdXJzb3JGb3JQYWdlKG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IGN1cnNvcklkID0gYXdhaXQgcHJpc21hLnVzZXJfd2l0aF9pZC5maW5kRmlyc3Qoe1xuICAgIG9yZGVyQnk6IHtcbiAgICAgIGlkOiBcImFzY1wiLFxuICAgIH0sXG4gICAgc2tpcDogbiAqIHBhZ2UsXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICB9LFxuICB9KTtcblxuICBpZiAoY3Vyc29ySWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjdXJzb3IgaWQgZm91bmRcIik7XG4gIH1cbiAgcmV0dXJuIGN1cnNvcklkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0UGFnZVdpdGhDdXJzb3IobjogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcbiAgY29uc3QgY3Vyc29ySWQgPSBhd2FpdCBnZXRVc2Vyc0N1cnNvckZvclBhZ2UobiwgcGFnZSk7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNobWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfaWQgV0hFUkUgaWQgPj0gJHtjdXJzb3JJZC5pZH0gTElNSVQgJHtufWApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0UGFnZVdpdGhPZmZzZXQobjogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKGBTRUxFQ1QgKiBGUk9NIHVzZXJfd2l0aF9pZCBMSU1JVCAke259IE9GRlNFVCAke24gKiBwYWdlfWApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0QWxsVXNlcnNXaXRoUG9zdHMoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNobWFyayhgU0VMRUNUICogRlJPTSBwb3N0X3dpdGhfdXNlcl9pZCBwIElOTkVSIEpPSU4gdXNlcl93aXRoX2lkIHUgT04gcC5hdXRob3JfaWQgPSB1LmlkO2ApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRCb29rbWFya3NDdXJzb3JGb3JQYWdlKG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IGN1cnNvcklkID0gYXdhaXQgcHJpc21hLmJvb2ttYXJrX3dpdGhfdXNlcl9pZC5maW5kRmlyc3Qoe1xuICAgIG9yZGVyQnk6IHtcbiAgICAgIGlkOiBcImFzY1wiLFxuICAgIH0sXG4gICAgc2tpcDogbiAqIHBhZ2UsXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICB9LFxuICB9KTtcblxuICBpZiAoY3Vyc29ySWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjdXJzb3IgaWQgZm91bmRcIik7XG4gIH1cbiAgcmV0dXJuIGN1cnNvcklkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0UGFnZVVzZXJCb29rbWFya3NXaXRoUG9zdHNBbmRVc2VyKG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IGN1cnNvcklkID0gYXdhaXQgZ2V0Qm9va21hcmtzQ3Vyc29yRm9yUGFnZShuLCBwYWdlKTtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKFxuICAgIGBTRUxFQ1QgKiBGUk9NIGJvb2ttYXJrX3dpdGhfdXNlcl9pZCBiIElOTkVSIEpPSU4gcG9zdF93aXRoX3VzZXJfaWQgcCBPTiBiLnBvc3RfaWQgPSBwLmlkIElOTkVSIEpPSU4gdXNlcl93aXRoX2lkIHUgT04gcC5hdXRob3JfaWQgPSB1LmlkIFdIRVJFIGIuaWQgPj0gJHtjdXJzb3JJZC5pZH0gT1JERVIgQlkgYi5pZCBBU0MgTElNSVQgJHtufWBcbiAgKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==
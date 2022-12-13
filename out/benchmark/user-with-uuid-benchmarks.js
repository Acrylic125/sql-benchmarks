"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPageUserBookmarksWithPostsAndUser = exports.selectAllUsersWithPosts = exports.selectPageWithOffset = exports.selectPageWithCursor = exports.selectLast1000Users = exports.selectFirstNthUsers = exports.selectAll = void 0;
const benchmark_1 = __importDefault(require("../utils/benchmark"));
const client_1 = __importDefault(require("../db/client"));
async function selectAll() {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_uuid`);
    return result;
}
exports.selectAll = selectAll;
async function selectFirstNthUsers(n) {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_uuid LIMIT ${n}`);
    return result;
}
exports.selectFirstNthUsers = selectFirstNthUsers;
async function selectLast1000Users(n, total) {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_uuid OFFSET ${total - n} LIMIT ${n}`);
    return result;
}
exports.selectLast1000Users = selectLast1000Users;
async function getUsersCursorForPage(n, page) {
    const cursorId = await client_1.default.user_with_uuid.findFirst({
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
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_uuid WHERE id >= ''${cursorId.id}'' ORDER BY id ASC LIMIT ${n}`);
    return result;
}
exports.selectPageWithCursor = selectPageWithCursor;
async function selectPageWithOffset(n, page) {
    const result = (0, benchmark_1.default)(`SELECT * FROM user_with_uuid LIMIT ${n} OFFSET ${n * page}`);
    return result;
}
exports.selectPageWithOffset = selectPageWithOffset;
async function selectAllUsersWithPosts() {
    const result = (0, benchmark_1.default)(`SELECT * FROM post_with_user_uuid p INNER JOIN user_with_uuid u ON p.author_id = u.id;`);
    return result;
}
exports.selectAllUsersWithPosts = selectAllUsersWithPosts;
async function getBookmarksCursorForPage(n, page) {
    const cursorId = await client_1.default.bookmark_with_user_uuid.findFirst({
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
    const result = (0, benchmark_1.default)(`SELECT * FROM bookmark_with_user_uuid b INNER JOIN post_with_user_uuid p ON b.post_id = p.id INNER JOIN user_with_uuid u ON p.author_id = u.id WHERE b.id >= ${cursorId.id} ORDER BY b.id ASC LIMIT ${n}`);
    return result;
}
exports.selectPageUserBookmarksWithPostsAndUser = selectPageUserBookmarksWithPostsAndUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13aXRoLXV1aWQtYmVuY2htYXJrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iZW5jaG1hcmsvdXNlci13aXRoLXV1aWQtYmVuY2htYXJrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtRUFBMkM7QUFDM0MsMERBQWtDO0FBRTNCLEtBQUssVUFBVSxTQUFTO0lBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFIRCw4QkFHQztBQUVNLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxDQUFTO0lBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQyxzQ0FBc0MsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSEQsa0RBR0M7QUFFTSxLQUFLLFVBQVUsbUJBQW1CLENBQUMsQ0FBUyxFQUFFLEtBQWE7SUFDaEUsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLHVDQUF1QyxLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUhELGtEQUdDO0FBRUQsS0FBSyxVQUFVLHFCQUFxQixDQUFDLENBQVMsRUFBRSxJQUFZO0lBQzFELE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3JELE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxLQUFLO1NBQ1Y7UUFDRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUk7UUFDZCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsSUFBSTtTQUNUO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN2QztJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFTSxLQUFLLFVBQVUsb0JBQW9CLENBQUMsQ0FBUyxFQUFFLElBQVk7SUFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLDhDQUE4QyxRQUFRLENBQUMsRUFBRSw0QkFBNEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSkQsb0RBSUM7QUFFTSxLQUFLLFVBQVUsb0JBQW9CLENBQUMsQ0FBUyxFQUFFLElBQVk7SUFDaEUsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBUyxFQUFDLHNDQUFzQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUhELG9EQUdDO0FBRU0sS0FBSyxVQUFVLHVCQUF1QjtJQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFTLEVBQUMsd0ZBQXdGLENBQUMsQ0FBQztJQUNuSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSEQsMERBR0M7QUFFRCxLQUFLLFVBQVUseUJBQXlCLENBQUMsQ0FBUyxFQUFFLElBQVk7SUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQztRQUM5RCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSztTQUNWO1FBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJO1FBQ2QsTUFBTSxFQUFFO1lBQ04sRUFBRSxFQUFFLElBQUk7U0FDVDtLQUNGLENBQUMsQ0FBQztJQUVILElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDdkM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRU0sS0FBSyxVQUFVLHVDQUF1QyxDQUFDLENBQVMsRUFBRSxJQUFZO0lBQ25GLE1BQU0sUUFBUSxHQUFHLE1BQU0seUJBQXlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFDdEIsZ0tBQWdLLFFBQVEsQ0FBQyxFQUFFLDRCQUE0QixDQUFDLEVBQUUsQ0FDM00sQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFORCwwRkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW5jaG1hcmsgZnJvbSBcIi4uL3V0aWxzL2JlbmNobWFya1wiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vZGIvY2xpZW50XCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNobWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfdXVpZGApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0Rmlyc3ROdGhVc2VycyhuOiBudW1iZXIpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKGBTRUxFQ1QgKiBGUk9NIHVzZXJfd2l0aF91dWlkIExJTUlUICR7bn1gKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExhc3QxMDAwVXNlcnMobjogbnVtYmVyLCB0b3RhbDogbnVtYmVyKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJlbmNobWFyayhgU0VMRUNUICogRlJPTSB1c2VyX3dpdGhfdXVpZCBPRkZTRVQgJHt0b3RhbCAtIG59IExJTUlUICR7bn1gKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlcnNDdXJzb3JGb3JQYWdlKG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IGN1cnNvcklkID0gYXdhaXQgcHJpc21hLnVzZXJfd2l0aF91dWlkLmZpbmRGaXJzdCh7XG4gICAgb3JkZXJCeToge1xuICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgfSxcbiAgICBza2lwOiBuICogcGFnZSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgIH0sXG4gIH0pO1xuXG4gIGlmIChjdXJzb3JJZCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGN1cnNvciBpZCBmb3VuZFwiKTtcbiAgfVxuICByZXR1cm4gY3Vyc29ySWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RQYWdlV2l0aEN1cnNvcihuOiBudW1iZXIsIHBhZ2U6IG51bWJlcikge1xuICBjb25zdCBjdXJzb3JJZCA9IGF3YWl0IGdldFVzZXJzQ3Vyc29yRm9yUGFnZShuLCBwYWdlKTtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKGBTRUxFQ1QgKiBGUk9NIHVzZXJfd2l0aF91dWlkIFdIRVJFIGlkID49ICcnJHtjdXJzb3JJZC5pZH0nJyBPUkRFUiBCWSBpZCBBU0MgTElNSVQgJHtufWApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0UGFnZVdpdGhPZmZzZXQobjogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKGBTRUxFQ1QgKiBGUk9NIHVzZXJfd2l0aF91dWlkIExJTUlUICR7bn0gT0ZGU0VUICR7biAqIHBhZ2V9YCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RBbGxVc2Vyc1dpdGhQb3N0cygpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVuY2htYXJrKGBTRUxFQ1QgKiBGUk9NIHBvc3Rfd2l0aF91c2VyX3V1aWQgcCBJTk5FUiBKT0lOIHVzZXJfd2l0aF91dWlkIHUgT04gcC5hdXRob3JfaWQgPSB1LmlkO2ApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRCb29rbWFya3NDdXJzb3JGb3JQYWdlKG46IG51bWJlciwgcGFnZTogbnVtYmVyKSB7XG4gIGNvbnN0IGN1cnNvcklkID0gYXdhaXQgcHJpc21hLmJvb2ttYXJrX3dpdGhfdXNlcl91dWlkLmZpbmRGaXJzdCh7XG4gICAgb3JkZXJCeToge1xuICAgICAgaWQ6IFwiYXNjXCIsXG4gICAgfSxcbiAgICBza2lwOiBuICogcGFnZSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgIH0sXG4gIH0pO1xuXG4gIGlmIChjdXJzb3JJZCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGN1cnNvciBpZCBmb3VuZFwiKTtcbiAgfVxuICByZXR1cm4gY3Vyc29ySWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RQYWdlVXNlckJvb2ttYXJrc1dpdGhQb3N0c0FuZFVzZXIobjogbnVtYmVyLCBwYWdlOiBudW1iZXIpIHtcbiAgY29uc3QgY3Vyc29ySWQgPSBhd2FpdCBnZXRCb29rbWFya3NDdXJzb3JGb3JQYWdlKG4sIHBhZ2UpO1xuICBjb25zdCByZXN1bHQgPSBiZW5jaG1hcmsoXG4gICAgYFNFTEVDVCAqIEZST00gYm9va21hcmtfd2l0aF91c2VyX3V1aWQgYiBJTk5FUiBKT0lOIHBvc3Rfd2l0aF91c2VyX3V1aWQgcCBPTiBiLnBvc3RfaWQgPSBwLmlkIElOTkVSIEpPSU4gdXNlcl93aXRoX3V1aWQgdSBPTiBwLmF1dGhvcl9pZCA9IHUuaWQgV0hFUkUgYi5pZCA+PSAke2N1cnNvcklkLmlkfSBPUkRFUiBCWSBiLmlkIEFTQyBMSU1JVCAke259YFxuICApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuIl19
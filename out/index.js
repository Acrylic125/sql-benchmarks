"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersWithId = __importStar(require("./benchmark/user-with-id-benchmarks"));
const usersWithuuid = __importStar(require("./benchmark/user-with-uuid-benchmarks"));
const run_benchmarks_seq_1 = __importDefault(require("./utils/run-benchmarks-seq"));
(0, run_benchmarks_seq_1.default)([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlGQUFtRTtBQUNuRSxxRkFBdUU7QUFFdkUsb0ZBQTBEO0FBRTFELElBQUEsNEJBQWdCLEVBQUM7SUFDZjtRQUNFLEdBQUcsRUFBRSwwQkFBMEI7UUFDL0IsRUFBRSxFQUFFLFdBQVcsQ0FBQyxTQUFTO0tBQzFCO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsc0NBQXNDO1FBQzNDLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNiLE9BQU8sV0FBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FDRjtJQUNEO1FBQ0UsR0FBRyxFQUFFLHFDQUFxQztRQUMxQyxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDYixPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNGO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsdUNBQXVDO1FBQzVDLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNiLE9BQU8sV0FBVyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQ0Y7SUFDRDtRQUNFLEdBQUcsRUFBRSx1Q0FBdUM7UUFDNUMsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ2IsT0FBTyxXQUFXLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FDRjtJQUNEO1FBQ0UsR0FBRyxFQUFFLDJDQUEyQztRQUNoRCxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDYixPQUFPLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9DLENBQUM7S0FDRjtJQUNEO1FBQ0UsR0FBRyxFQUFFLDhEQUE4RDtRQUNuRSxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDYixPQUFPLFdBQVcsQ0FBQyx1Q0FBdUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkUsQ0FBQztLQUNGO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsNEJBQTRCO1FBQ2pDLEVBQUUsRUFBRSxhQUFhLENBQUMsU0FBUztLQUM1QjtJQUNEO1FBQ0UsR0FBRyxFQUFFLHdDQUF3QztRQUM3QyxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDYixPQUFPLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQ0Y7SUFDRDtRQUNFLEdBQUcsRUFBRSx1Q0FBdUM7UUFDNUMsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ2IsT0FBTyxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FDRjtJQUNEO1FBQ0UsR0FBRyxFQUFFLHlDQUF5QztRQUM5QyxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDYixPQUFPLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNGO0lBQ0Q7UUFDRSxHQUFHLEVBQUUseUNBQXlDO1FBQzlDLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNiLE9BQU8sYUFBYSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQ0Y7SUFDRDtRQUNFLEdBQUcsRUFBRSw2Q0FBNkM7UUFDbEQsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ2IsT0FBTyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNqRCxDQUFDO0tBQ0Y7SUFDRDtRQUNFLEdBQUcsRUFBRSw0RUFBNEU7UUFDakYsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ2IsT0FBTyxhQUFhLENBQUMsdUNBQXVDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHVzZXJzV2l0aElkIGZyb20gXCIuL2JlbmNobWFyay91c2VyLXdpdGgtaWQtYmVuY2htYXJrc1wiO1xuaW1wb3J0ICogYXMgdXNlcnNXaXRodXVpZCBmcm9tIFwiLi9iZW5jaG1hcmsvdXNlci13aXRoLXV1aWQtYmVuY2htYXJrc1wiO1xuaW1wb3J0IHJ1bkJlbmNobWFya3MgZnJvbSBcIi4vdXRpbHMvcnVuLWJlbmNobWFya3NcIjtcbmltcG9ydCBydW5CZW5jaG1hcmtzU2VxIGZyb20gXCIuL3V0aWxzL3J1bi1iZW5jaG1hcmtzLXNlcVwiO1xuXG5ydW5CZW5jaG1hcmtzU2VxKFtcbiAge1xuICAgIHRhZzogXCJ1c2VyLXdpdGgtaWQ6IFNlbGVjdCBBbGxcIixcbiAgICBmbjogdXNlcnNXaXRoSWQuc2VsZWN0QWxsLFxuICB9LFxuICB7XG4gICAgdGFnOiBcInVzZXItd2l0aC1pZDogU2VsZWN0IEZpcnN0IE50aCBVc2Vyc1wiLFxuICAgIGZuOiBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gdXNlcnNXaXRoSWQuc2VsZWN0Rmlyc3ROdGhVc2VycygxMDApO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICB0YWc6IFwidXNlci13aXRoLWlkOiBTZWxlY3QgTGFzdCBOdGggVXNlcnNcIixcbiAgICBmbjogYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJzV2l0aElkLnNlbGVjdExhc3QxMDAwVXNlcnMoMTAwMCwgNDk5MDAwKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGFnOiBcInVzZXItd2l0aC1pZDogU2VsZWN0IFBhZ2UgV2l0aCBDdXJzb3JcIixcbiAgICBmbjogYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJzV2l0aElkLnNlbGVjdFBhZ2VXaXRoQ3Vyc29yKDEwMCwgNDIwMCk7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHRhZzogXCJ1c2VyLXdpdGgtaWQ6IFNlbGVjdCBQYWdlIFdpdGggT2Zmc2V0XCIsXG4gICAgZm46IGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiB1c2Vyc1dpdGhJZC5zZWxlY3RQYWdlV2l0aE9mZnNldCgxMDAsIDQyMCk7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHRhZzogXCJ1c2VyLXdpdGgtaWQ6IFNlbGVjdCBBbGwgVXNlcnMgV2l0aCBQb3N0c1wiLFxuICAgIGZuOiBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gdXNlcnNXaXRoSWQuc2VsZWN0QWxsVXNlcnNXaXRoUG9zdHMoKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGFnOiBcInVzZXItd2l0aC1pZDogU2VsZWN0IFBhZ2UgVXNlciBCb29rbWFya3MgV2l0aCBQb3N0cyBBbmQgVXNlclwiLFxuICAgIGZuOiBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gdXNlcnNXaXRoSWQuc2VsZWN0UGFnZVVzZXJCb29rbWFya3NXaXRoUG9zdHNBbmRVc2VyKDEwMCwgNDIwKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGFnOiBcInVzZXItd2l0aC11dWlkOiBTZWxlY3QgQWxsXCIsXG4gICAgZm46IHVzZXJzV2l0aHV1aWQuc2VsZWN0QWxsLFxuICB9LFxuICB7XG4gICAgdGFnOiBcInVzZXItd2l0aC11dWlkOiBTZWxlY3QgRmlyc3QgTnRoIFVzZXJzXCIsXG4gICAgZm46IGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiB1c2Vyc1dpdGh1dWlkLnNlbGVjdEZpcnN0TnRoVXNlcnMoMTAwKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGFnOiBcInVzZXItd2l0aC11dWlkOiBTZWxlY3QgTGFzdCBOdGggVXNlcnNcIixcbiAgICBmbjogYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJzV2l0aHV1aWQuc2VsZWN0TGFzdDEwMDBVc2VycygxMDAwLCA0OTkwMDApO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICB0YWc6IFwidXNlci13aXRoLXV1aWQ6IFNlbGVjdCBQYWdlIFdpdGggQ3Vyc29yXCIsXG4gICAgZm46IGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiB1c2Vyc1dpdGh1dWlkLnNlbGVjdFBhZ2VXaXRoQ3Vyc29yKDEwMCwgNDIwMCk7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHRhZzogXCJ1c2VyLXdpdGgtdXVpZDogU2VsZWN0IFBhZ2UgV2l0aCBPZmZzZXRcIixcbiAgICBmbjogYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJzV2l0aHV1aWQuc2VsZWN0UGFnZVdpdGhPZmZzZXQoMTAwLCA0MjApO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICB0YWc6IFwidXNlci13aXRoLXV1aWQ6IFNlbGVjdCBBbGwgVXNlcnMgV2l0aCBQb3N0c1wiLFxuICAgIGZuOiBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gdXNlcnNXaXRodXVpZC5zZWxlY3RBbGxVc2Vyc1dpdGhQb3N0cygpO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICB0YWc6IFwidXNlci13aXRoLXV1aWQ6IFNlbGVjdCBQYWdlIFVzZXIgQm9va21hcmtzIFdpdGggUG9zdHMgQW5kIFVzZXIgV2l0aCBDdXJzb3JcIixcbiAgICBmbjogYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHVzZXJzV2l0aHV1aWQuc2VsZWN0UGFnZVVzZXJCb29rbWFya3NXaXRoUG9zdHNBbmRVc2VyKDEwMCwgNDIwKTtcbiAgICB9LFxuICB9LFxuXSk7XG4iXX0=
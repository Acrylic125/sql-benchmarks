export declare function selectAll(): Promise<import("../utils/benchmark").BenchmarkResults>;
export declare function selectFirstNthUsers(n: number): Promise<import("../utils/benchmark").BenchmarkResults>;
export declare function selectLast1000Users(n: number, total: number): Promise<import("../utils/benchmark").BenchmarkResults>;
export declare function selectPageWithCursor(n: number, page: number): Promise<import("../utils/benchmark").BenchmarkResults>;
export declare function selectPageWithOffset(n: number, page: number): Promise<import("../utils/benchmark").BenchmarkResults>;
export declare function selectAllUsersWithPosts(): Promise<import("../utils/benchmark").BenchmarkResults>;
export declare function selectAllUserBookmarksWithPostsAndUser(skip: number, take: number): Promise<import("../utils/benchmark").BenchmarkResults>;

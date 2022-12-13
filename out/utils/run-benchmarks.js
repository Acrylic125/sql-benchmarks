"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_benchmark_1 = __importDefault(require("./format-benchmark"));
async function runBenchmarks(benchmarks) {
    const results = await Promise.all(benchmarks.map(async (benchmark) => {
        const result = await benchmark.fn();
        console.log(`Done Benchmarking: ${benchmark.tag}`);
        return {
            result,
            tag: benchmark.tag,
        };
    }));
    console.log("Tag / Avg / Min / Q1 / Median / Q3 / p95 / Max");
    results.forEach((result) => {
        console.log((0, format_benchmark_1.default)(result.tag, result.result));
    });
}
exports.default = runBenchmarks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLWJlbmNobWFya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcnVuLWJlbmNobWFya3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSwwRUFBaUQ7QUFFbEMsS0FBSyxVQUFVLGFBQWEsQ0FDekMsVUFHRztJQUVILE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDL0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7UUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbkQsT0FBTztZQUNMLE1BQU07WUFDTixHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7U0FDbkIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSwwQkFBZSxFQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckJELGdDQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQmVuY2htYXJrUmVzdWx0cyB9IGZyb20gXCIuL2JlbmNobWFya1wiO1xuaW1wb3J0IGZvcm1hdEJlbmNobWFyayBmcm9tIFwiLi9mb3JtYXQtYmVuY2htYXJrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJ1bkJlbmNobWFya3MoXG4gIGJlbmNobWFya3M6IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBmbjogKCkgPT4gUHJvbWlzZTxCZW5jaG1hcmtSZXN1bHRzPjtcbiAgfVtdXG4pIHtcbiAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIGJlbmNobWFya3MubWFwKGFzeW5jIChiZW5jaG1hcmspID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGJlbmNobWFyay5mbigpO1xuICAgICAgY29uc29sZS5sb2coYERvbmUgQmVuY2htYXJraW5nOiAke2JlbmNobWFyay50YWd9YCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQsXG4gICAgICAgIHRhZzogYmVuY2htYXJrLnRhZyxcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICBjb25zb2xlLmxvZyhcIlRhZyAvIEF2ZyAvIE1pbiAvIFExIC8gTWVkaWFuIC8gUTMgLyBwOTUgLyBNYXhcIik7XG4gIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgY29uc29sZS5sb2coZm9ybWF0QmVuY2htYXJrKHJlc3VsdC50YWcsIHJlc3VsdC5yZXN1bHQpKTtcbiAgfSk7XG59XG4iXX0=
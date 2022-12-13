"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_benchmark_1 = __importDefault(require("./format-benchmark"));
async function runBenchmarksSeq(benchmarks) {
    const results = [];
    for (const benchmark of benchmarks) {
        const result = await benchmark.fn();
        results.push({
            result,
            tag: benchmark.tag,
        });
        console.log(`Done Benchmarking: ${benchmark.tag}`);
    }
    console.log("Tag / Avg / Min / Q1 / Median / Q3 / p95 / Max");
    results.forEach((result) => {
        console.log((0, format_benchmark_1.default)(result.tag, result.result));
    });
}
exports.default = runBenchmarksSeq;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLWJlbmNobWFya3Mtc2VxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3J1bi1iZW5jaG1hcmtzLXNlcS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDBFQUFpRDtBQUVsQyxLQUFLLFVBQVUsZ0JBQWdCLENBQzVDLFVBR0c7SUFFSCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7UUFDbEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNYLE1BQU07WUFDTixHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSwwQkFBZSxFQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcEJELG1DQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQmVuY2htYXJrUmVzdWx0cyB9IGZyb20gXCIuL2JlbmNobWFya1wiO1xuaW1wb3J0IGZvcm1hdEJlbmNobWFyayBmcm9tIFwiLi9mb3JtYXQtYmVuY2htYXJrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJ1bkJlbmNobWFya3NTZXEoXG4gIGJlbmNobWFya3M6IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBmbjogKCkgPT4gUHJvbWlzZTxCZW5jaG1hcmtSZXN1bHRzPjtcbiAgfVtdXG4pIHtcbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICBmb3IgKGNvbnN0IGJlbmNobWFyayBvZiBiZW5jaG1hcmtzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYmVuY2htYXJrLmZuKCk7XG4gICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRhZzogYmVuY2htYXJrLnRhZyxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhgRG9uZSBCZW5jaG1hcmtpbmc6ICR7YmVuY2htYXJrLnRhZ31gKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiVGFnIC8gQXZnIC8gTWluIC8gUTEgLyBNZWRpYW4gLyBRMyAvIHA5NSAvIE1heFwiKTtcbiAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhmb3JtYXRCZW5jaG1hcmsocmVzdWx0LnRhZywgcmVzdWx0LnJlc3VsdCkpO1xuICB9KTtcbn1cbiJdfQ==
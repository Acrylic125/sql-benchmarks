"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_benchmark_1 = __importDefault(require("./format-benchmark"));
async function runBenchmarks(benchmarks) {
    const results = await Promise.all(benchmarks.map(async (benchmark) => {
        const result = await benchmark.fn();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLWJlbmNobWFya3MgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ydW4tYmVuY2htYXJrcyBjb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMEVBQWlEO0FBRWxDLEtBQUssVUFBVSxhQUFhLENBQ3pDLFVBR0c7SUFFSCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQy9CLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLE9BQU87WUFDTCxNQUFNO1lBQ04sR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHO1NBQ25CLENBQUM7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQzlELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsMEJBQWUsRUFBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBCRCxnQ0FvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEJlbmNobWFya1Jlc3VsdHMgfSBmcm9tIFwiLi9iZW5jaG1hcmtcIjtcbmltcG9ydCBmb3JtYXRCZW5jaG1hcmsgZnJvbSBcIi4vZm9ybWF0LWJlbmNobWFya1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBydW5CZW5jaG1hcmtzKFxuICBiZW5jaG1hcmtzOiB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZm46ICgpID0+IFByb21pc2U8QmVuY2htYXJrUmVzdWx0cz47XG4gIH1bXVxuKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBiZW5jaG1hcmtzLm1hcChhc3luYyAoYmVuY2htYXJrKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBiZW5jaG1hcmsuZm4oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgdGFnOiBiZW5jaG1hcmsudGFnLFxuICAgICAgfTtcbiAgICB9KVxuICApO1xuXG4gIGNvbnNvbGUubG9nKFwiVGFnIC8gQXZnIC8gTWluIC8gUTEgLyBNZWRpYW4gLyBRMyAvIHA5NSAvIE1heFwiKTtcbiAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhmb3JtYXRCZW5jaG1hcmsocmVzdWx0LnRhZywgcmVzdWx0LnJlc3VsdCkpO1xuICB9KTtcbn1cbiJdfQ==
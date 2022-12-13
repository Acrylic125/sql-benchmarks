import { BenchmarkResults } from "./benchmark";

const dp = 3;
export default function formatBenchmark(tag: string, result: BenchmarkResults) {
  return `${tag} : 
    ${result.avg.toFixed(dp)}ms / ${result.min.toFixed(dp)}ms / ${result.q1.toFixed(dp)}ms / ${result.median.toFixed(dp)}ms / ${result.q3.toFixed(
    dp
  )}ms / ${result.p95.toFixed(dp)}ms / ${result.max.toFixed(dp)}ms`;
}

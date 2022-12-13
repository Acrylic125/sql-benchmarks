import type { BenchmarkResults } from "./benchmark";
import formatBenchmark from "./format-benchmark";

export default async function runBenchmarks(
  benchmarks: {
    tag: string;
    fn: () => Promise<BenchmarkResults>;
  }[]
) {
  const results = await Promise.all(
    benchmarks.map(async (benchmark) => {
      const result = await benchmark.fn();
      console.log(`Done Benchmarking: ${benchmark.tag}`);
      return {
        result,
        tag: benchmark.tag,
      };
    })
  );

  console.log("Tag / Avg / Min / Q1 / Median / Q3 / p95 / Max");
  results.forEach((result) => {
    console.log(formatBenchmark(result.tag, result.result));
  });
}

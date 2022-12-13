import type { BenchmarkResults } from "./benchmark";
import formatBenchmark from "./format-benchmark";

export default async function runBenchmarksSeq(
  benchmarks: {
    tag: string;
    fn: () => Promise<BenchmarkResults>;
  }[]
) {
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
    console.log(formatBenchmark(result.tag, result.result));
  });
}

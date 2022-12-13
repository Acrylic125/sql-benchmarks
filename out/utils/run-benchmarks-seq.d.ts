import type { BenchmarkResults } from "./benchmark";
export default function runBenchmarksSeq(benchmarks: {
    tag: string;
    fn: () => Promise<BenchmarkResults>;
}[]): Promise<void>;

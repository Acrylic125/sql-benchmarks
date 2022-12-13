import type { BenchmarkResults } from "./benchmark";
export default function runBenchmarks(benchmarks: {
    tag: string;
    fn: () => Promise<BenchmarkResults>;
}[]): Promise<void>;

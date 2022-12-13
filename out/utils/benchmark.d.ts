export type BenchmarkResults = {
    avg: number;
    min: number;
    q1: number;
    median: number;
    q3: number;
    p95: number;
    max: number;
};
export default function benchmark(query: string): Promise<BenchmarkResults>;

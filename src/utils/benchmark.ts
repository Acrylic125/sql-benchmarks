import { Prisma } from "@prisma/client";
import prisma from "../db/client";

export type BenchmarkResults = {
  avg: number;
  min: number;
  q1: number;
  median: number;
  q3: number;
  p95: number;
  max: number;
};

// Its a benchmark, we dgaf about SQL injection.
export default async function benchmark(query: string): Promise<BenchmarkResults> {
  const newQuery = `SELECT * FROM bench('` + query + `');`;
  console.log(newQuery);
  const result = await prisma.$queryRawUnsafe(newQuery);
  if (result instanceof Array) {
    return result[0] as BenchmarkResults;
  }
  throw new Error("Unexpected result from benchmark");
}

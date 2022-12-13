# SQL Benchmarking

A simple benchmark comparison between `SERIAL` and `UUID` keys in PostgreSQL.

## Setup

1. Create a database in PostgreSQL.
1. Run the `init.sql` file. This will generate the functions to be used in the benchmark.
1. Run `npm run i` to install dependencies.
1. Go to `.env.sample`, **copy** it and rename it to `.env`.
1. Fill in the database credentials in `.env`.
1. Run `npx prisma db push` to generate the database schema.
1. Run `npm run dev` to start the TS server.
1. Run `npm run seed` to seed the database. Please wait for the seeding to finish before proceeding to the next step.
1. Run `npm run start` to start the benchmark.

Note: The benchmarks run in sequential order. To change this, go to `src/index.ts` and change the `runBenchmarksSeq` function to `runBenchmarks`.

## Methodology

Postgres offers us many ways to benchmark our queries. Some of these strategies include `EXPLAIN ANALYZE`, `pgbench`, and `bench` function which has been discussed in this [article](https://www.tangramvision.com/blog/how-to-benchmark-postgresql-queries-well).

In this benchmark, we will be using the `bench` function. This function will first run **5 warm up calls** to the query and then **100 calls** to the query. The function will then return the average time (avg), minimum time (min), quartile 1 time (q1), median time (Median), quartile 3 time (q3), 95th percentile time (p95), and maximum time (max) taken to run the query in milliseconds.

## Data

In this benchmark, we try to minimize the factors that can affect the benchmarking results.

We have 2 variation of each table, `with_id` (For SERIAL ids) and `with_uuid` (For UUID ids).

We have 2 more sets of tables, `post`, and `bookmark`, with 2 other variations, each table suffixed with `_with_id` and `_with_uuid` to match the variations of the `user` tables.

Each variation of the `user` table will do queries on the same variation of the `post` and `bookmark` tables.

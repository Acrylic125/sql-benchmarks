export default async function batchExecute<T = any>({
  onEachBatch,
  onBeforeBatch,
  onAfterBatch,
  onBatchSuccess,
  onBatchError,
  batchSize,
  data,
}: {
  onEachBatch: (batch: T[], batchIndex: number) => Promise<void>;
  onBeforeBatch?: (batch: T[], batchIndex: number) => Promise<void>;
  onAfterBatch?: (batch: T[], batchIndex: number) => Promise<void>;
  onBatchSuccess?: (batch: T[], batchIndex: number) => Promise<void>;
  onBatchError?: (error: any, batch: T[], batchIndex: number) => Promise<void>;
  batchSize: number;
  data: T[];
}) {
  const dataSize = data.length;
  let cursor = 0;

  // Include the last batch even if it's smaller than the batch size
  while (cursor < dataSize) {
    const batch = data.slice(cursor, cursor + batchSize);
    const batchIndex = cursor / batchSize;
    cursor += batchSize;

    onBeforeBatch && (await onBeforeBatch(batch, batchIndex));
    try {
      await onEachBatch(batch, batchIndex);
      onBatchSuccess && (await onBatchSuccess(batch, batchIndex));
    } catch (error) {
      onBatchError && (await onBatchError(error, batch, batchIndex));
    }
    onAfterBatch && (await onAfterBatch(batch, batchIndex));
  }
}

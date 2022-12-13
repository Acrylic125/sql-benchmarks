export default function batchExecute<T = any>({ onEachBatch, onBeforeBatch, onAfterBatch, onBatchSuccess, onBatchError, batchSize, data, }: {
    onEachBatch: (batch: T[], batchIndex: number) => Promise<void>;
    onBeforeBatch?: (batch: T[], batchIndex: number) => Promise<void>;
    onAfterBatch?: (batch: T[], batchIndex: number) => Promise<void>;
    onBatchSuccess?: (batch: T[], batchIndex: number) => Promise<void>;
    onBatchError?: (error: any, batch: T[], batchIndex: number) => Promise<void>;
    batchSize: number;
    data: T[];
}): Promise<void>;

import { availableParallelism } from 'node:os';

type BuildWorkerBudgetOptions = {
  maxWorkers: number;
  override?: string | undefined;
  parallelism?: number;
  reserve?: number;
};

export function buildWorkerBudget({
  maxWorkers,
  override,
  parallelism = availableParallelism(),
  reserve = 1,
}: BuildWorkerBudgetOptions) {
  const available = Math.max(1, Math.floor(parallelism));
  const requested =
    override !== undefined && /^\d+$/.test(override) ? Number(override) : 0;

  if (requested > 0) return Math.min(available, requested);

  return Math.min(
    Math.max(1, Math.floor(maxWorkers)),
    Math.max(1, available - Math.max(0, Math.floor(reserve))),
  );
}

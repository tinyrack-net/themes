import { describe, expect, it } from 'vitest';
import {
  createBuildAssetCache,
  mapWithConcurrency,
} from '../src/vite/docs-assets-plugin.ts';

describe('documentation asset build scheduling', () => {
  it('shares one asset generation across concurrent build environments', async () => {
    let generations = 0;
    const cache = createBuildAssetCache(async () => {
      generations += 1;
      await Promise.resolve();
      return { generation: generations };
    });

    const [client, server] = await Promise.all([cache.get(), cache.get()]);

    expect(client).toBe(server);
    expect(generations).toBe(1);

    cache.invalidate();
    await expect(cache.get()).resolves.toEqual({ generation: 2 });
    expect(generations).toBe(2);
  });

  it('keeps parallel asset work within its configured worker budget', async () => {
    let active = 0;
    let peak = 0;
    const values = await mapWithConcurrency([1, 2, 3, 4, 5, 6], 3, async (value) => {
      active += 1;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active -= 1;
      return value * 2;
    });

    expect(values).toEqual([2, 4, 6, 8, 10, 12]);
    expect(peak).toBe(3);
  });
});

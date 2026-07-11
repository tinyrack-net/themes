import { describe, expect, it } from 'vitest';
import { tinyrackSemanticColors } from './tokens/semantic.js';

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
  if (channels === undefined) {
    throw new Error(`Invalid color: ${hex}`);
  }
  return (
    0.2126 * (channels[0] ?? 0) +
    0.7152 * (channels[1] ?? 0) +
    0.0722 * (channels[2] ?? 0)
  );
}

function contrast(left: string, right: string) {
  const first = luminance(left);
  const second = luminance(right);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

describe('semantic status contrast', () => {
  it('locks text, surface, border and filled contrast in both themes', () => {
    for (const theme of Object.values(tinyrackSemanticColors)) {
      for (const status of ['info', 'success', 'warning'] as const) {
        const text = theme[status];
        const surface = theme[`${status}Surface`];
        const border = theme[`${status}Border`];
        const filledContrast = theme[`${status}Contrast`];

        expect(
          contrast(text, surface),
          `${status} text on surface`,
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          contrast(border, surface),
          `${status} border on surface`,
        ).toBeGreaterThanOrEqual(3);
        expect(
          contrast(text, filledContrast),
          `${status} filled contrast`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});

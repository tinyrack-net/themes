import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createTinyrackCoreCss } from './create-core-css.ts';

const target = resolve(import.meta.dirname, '../src/core/core.css');
const expected = createTinyrackCoreCss();
const checkMode = process.argv.includes('--check');

if (checkMode) {
  const actual = await readFile(target, 'utf8');
  if (actual !== expected) {
    throw new Error('src/core/core.css is out of date. Run pnpm build:css.');
  }
  console.log('checked src/core/core.css');
} else {
  await writeFile(target, expected);
  console.log('generated src/core/core.css');
}

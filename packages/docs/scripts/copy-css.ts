import { cp, mkdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const checkMode = process.argv.includes('--check');
const asset = { source: 'src/styles/styles.css', target: 'dist/styles.css' } as const;
const source = resolve(root, asset.source);

if ((await readFile(source, 'utf8')).length === 0) {
  throw new Error(`${relative(root, source)} must not be empty`);
}
if (!checkMode) {
  const target = resolve(root, asset.target);
  await mkdir(dirname(target), { recursive: true });
  await cp(source, target);
}
console.log(
  `${checkMode ? 'checked' : 'copied'} ${relative(root, source)} -> ${asset.target}`,
);

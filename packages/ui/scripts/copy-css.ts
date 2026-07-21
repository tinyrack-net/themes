import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { transformBreakpointCss } from '../../../scripts/breakpoint-css.ts';
import { componentNames } from './component-catalog.ts';

const root = resolve(import.meta.dirname, '..');
const srcRoot = resolve(root, 'src');
const distRoot = resolve(root, 'dist');
const checkMode = process.argv.includes('--check');

const publicAssets = [
  ...componentNames.map((componentName) => ({
    source: `components/${componentName}/${componentName}.css`,
    target: `components/${componentName}/${componentName}.css`,
  })),
  { source: 'core/core.css', target: 'core.css' },
  { source: 'internal/layer-parts.css', target: 'internal/layer-parts.css' },
  { source: 'mdx/mdx.css', target: 'mdx.css' },
] as const;

await Promise.all(
  publicAssets.map(async ({ source }) => {
    const sourceFile = resolve(srcRoot, source);
    const existing = await readExistingFile(sourceFile);

    if (existing === null) {
      throw new Error(`${relative(root, sourceFile)} is missing.`);
    }

    if (existing.includes('Generated from')) {
      throw new Error(
        `${relative(root, sourceFile)} must be maintained as source CSS.`,
      );
    }

    await transformBreakpointCss(existing, sourceFile);
    if (checkMode) {
      console.log(`checked ${relative(root, sourceFile)}`);
    }
  }),
);

if (!checkMode) {
  await Promise.all(
    publicAssets.map(async ({ source, target }) => {
      const sourceFile = resolve(srcRoot, source);
      const targetFile = resolve(distRoot, target);
      const content = await readFile(sourceFile, 'utf8');
      const transformed = await transformBreakpointCss(content, sourceFile);
      await mkdir(dirname(targetFile), { recursive: true });
      await writeFile(targetFile, transformed);
      console.log(
        `copied ${relative(root, sourceFile)} -> ${relative(root, targetFile)}`,
      );
    }),
  );
}

async function readExistingFile(path: string) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

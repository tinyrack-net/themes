import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const pnpm = process.platform === 'win32' ? 'pnpm.exe' : 'pnpm';

function run(command: string, args: string[]) {
  execFileSync(command, args, { cwd: packageRoot, stdio: 'inherit' });
}

function usesPrebuiltOutput() {
  if (process.env['TINYRACK_TEST_PREBUILT'] !== 'true') return false;
  if (!existsSync(resolve(packageRoot, 'dist/styles.css'))) {
    throw new Error('Prebuilt docs output is missing styles.css');
  }
  return true;
}

const uiTarball = process.env['TINYRACK_UI_TARBALL'];
if (uiTarball === undefined || !isAbsolute(uiTarball) || !existsSync(uiTarball)) {
  throw new Error('TINYRACK_UI_TARBALL must point to a prepared UI package archive');
}
process.env['TINYRACK_UI_TARBALL'] = uiTarball;
if (!usesPrebuiltOutput()) run(pnpm, ['build']);
run(process.execPath, ['e2e/dist-package-smoke.ts']);

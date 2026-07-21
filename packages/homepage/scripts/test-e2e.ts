import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const pnpm = process.platform === 'win32' ? 'pnpm.exe' : 'pnpm';

function run(command: string, args: string[]) {
  execFileSync(command, args, { cwd: packageRoot, stdio: 'inherit' });
}

function usesPrebuiltOutput() {
  if (process.env['TINYRACK_TEST_PREBUILT'] !== 'true') return false;
  if (!existsSync(resolve(packageRoot, 'build/client/index.html'))) {
    throw new Error('Prebuilt homepage output is missing index.html');
  }
  return true;
}

if (!usesPrebuiltOutput()) run(pnpm, ['build']);
run(pnpm, ['exec', 'vitest', 'run', '--project', 'e2e']);
run(pnpm, ['exec', 'vitest', 'run', '--project', 'e2e-overlays']);

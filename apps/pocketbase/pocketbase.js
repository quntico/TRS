import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const binary = process.platform === 'win32' ? 'pocketbase.exe' : './pocketbase';
const args = process.argv.slice(2);

const child = spawn(join(__dirname, binary), args, {
  stdio: 'inherit',
  shell: false
});

child.on('close', (code) => {
  process.exit(code);
});
